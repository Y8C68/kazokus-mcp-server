import { describe, it, expect } from 'vitest';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createMcpServer } from '../src/index.js';

describe('per-request MCP server isolation (issue #2 regression)', () => {
  it('returns a fresh server instance on each call', () => {
    const a = createMcpServer();
    const b = createMcpServer();
    expect(a).not.toBe(b);
  });

  it('connects two independent servers concurrently without "Already connected"', async () => {
    const [, server1Side] = InMemoryTransport.createLinkedPair();
    const [, server2Side] = InMemoryTransport.createLinkedPair();
    const srv1 = createMcpServer();
    const srv2 = createMcpServer();

    await expect(
      Promise.all([srv1.connect(server1Side), srv2.connect(server2Side)])
    ).resolves.toBeDefined();

    await srv1.close();
    await srv2.close();
  });

  it('proves the old singleton pattern would crash: one server cannot bind two transports', async () => {
    const srv = createMcpServer();
    const [, transportA] = InMemoryTransport.createLinkedPair();
    const [, transportB] = InMemoryTransport.createLinkedPair();

    await srv.connect(transportA);
    await expect(srv.connect(transportB)).rejects.toThrow(/Already connected to a transport/);

    await srv.close();
  });
});
