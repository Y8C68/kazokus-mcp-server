import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { Server } from 'node:http';
import { AddressInfo } from 'node:net';
import { buildHttpServer } from '../src/index.js';

let server: Server;
let base: string;

beforeAll(async () => {
  server = buildHttpServer();
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const { port } = server.address() as AddressInfo;
  base = `http://127.0.0.1:${port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve()))
  );
});

const POST_BODY = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list',
  params: {},
});

describe('HTTP server contract', () => {
  it('GET /health returns 200 ok', async () => {
    const res = await fetch(`${base}/health`);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('ok');
  });

  it('GET /.well-known/mcp/server-card.json returns 200 JSON (Smithery scan)', async () => {
    const res = await fetch(`${base}/.well-known/mcp/server-card.json`);
    expect(res.status).toBe(200);
    const card = await res.json();
    expect(card.serverInfo.name).toBe('kazokus');
    expect(card.tools.length).toBe(6);
  });

  it('GET /mcp returns 405 with a JSON-RPC error (stateless: POST only)', async () => {
    const res = await fetch(`${base}/mcp`, { headers: { Accept: 'text/event-stream' } });
    expect(res.status).toBe(405);
    expect(res.headers.get('allow')).toBe('POST');
    const body = await res.json();
    expect(body.jsonrpc).toBe('2.0');
    expect(body.error.code).toBe(-32000);
    expect(body.error.message).toMatch(/stateless/i);
  });

  it('GET / also returns 405 (same MCP endpoint alias)', async () => {
    const res = await fetch(`${base}/`, { headers: { Accept: 'text/event-stream' } });
    expect(res.status).toBe(405);
  });

  it('POST /mcp tools/list returns 200 with the tool list', async () => {
    const res = await fetch(`${base}/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
      body: POST_BODY,
    });
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('kazokus_discover');
  });

  it('20 concurrent POSTs do not crash the server (issue #2 regression)', async () => {
    const results = await Promise.all(
      Array.from({ length: 20 }, () =>
        fetch(`${base}/mcp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
          body: POST_BODY,
        }).then((r) => r.status)
      )
    );
    expect(results.every((s) => s === 200)).toBe(true);

    // Server still responsive afterwards.
    const health = await fetch(`${base}/health`);
    expect(health.status).toBe(200);
  });
});
