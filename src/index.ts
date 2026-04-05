#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createServer } from 'node:http';
import { z } from 'zod';
import { handleDiscover } from './tools/discover.js';
import { handleCompare } from './tools/compare.js';
import { handlePricing } from './tools/pricing.js';
import { handleGetStarted } from './tools/get-started.js';
import { handleSearchCommunities } from './tools/search-communities.js';
import { handleTrending } from './tools/trending.js';
import { KazokusApiClient } from './api/client.js';

const apiClient = new KazokusApiClient(process.env.KAZOKUS_API_URL ?? 'https://www.kazokus.com');

const server = new McpServer({
  name: 'kazokus',
  version: '2.0.0',
});

// --- Static tools (Phase 1) ---

server.tool(
  'kazokus_discover',
  'Discover if Kazokus is the right community platform for your needs. Takes interests and requirements, returns matched features, recommended tier, and why Kazokus stands out (zero fees, AI on all tiers, multi-tenancy).',
  {
    interests: z.array(z.string()).optional().default([]).describe('Topics or industries of interest (e.g. "fitness", "education", "faith")'),
    needs: z.array(z.string()).optional().default([]).describe('Platform features needed (e.g. "courses", "events", "marketplace", "zero fees", "api")'),
  },
  async ({ interests, needs }) => {
    const result = handleDiscover({ interests, needs });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  'kazokus_compare',
  'Compare Kazokus against a specific competitor (Circle, Skool, Mighty Networks, Bettermode, Hivebrite, Heartbeat). Returns pricing, features, weaknesses, user complaints, and verdict.',
  {
    competitor: z.string().describe('Competitor name (e.g. "circle", "skool", "mighty-networks", "bettermode", "hivebrite", "heartbeat")'),
  },
  async ({ competitor }) => {
    const result = handleCompare({ competitor });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  'kazokus_pricing',
  'Get Kazokus pricing details. Optionally filter by tier or provide member count for cost comparison vs Circle, Mighty Networks, and Skool.',
  {
    tier: z.string().optional().describe('Filter to a specific tier (family-free, family-pro, launch, growth, pro, portfolio)'),
    members: z.number().optional().describe('Number of community members — if provided, returns cost comparison vs competitors'),
  },
  async ({ tier, members }) => {
    const result = handlePricing({ tier, members });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  'kazokus_get_started',
  'Get personalized onboarding guidance for Kazokus. Provide a use case (e.g. "yoga studio", "online course creator", "church") for tailored tier recommendation and setup steps.',
  {
    use_case: z.string().optional().describe('Your use case (e.g. "yoga studio", "franchise network", "online course creator", "family group", "professional association")'),
  },
  async ({ use_case }) => {
    const result = handleGetStarted({ use_case });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Live tools (Phase 2) ---

server.tool(
  'kazokus_search_communities',
  'Search for real Kazokus communities by topic, interest, or keyword. Returns live community data from the platform.',
  {
    query: z.string().describe('Search term (e.g. "yoga", "book club", "dance studio", "tech startups")'),
    category: z.string().optional().describe('Filter by category slug'),
    limit: z.number().optional().default(5).describe('Number of results (1-10, default 5)'),
  },
  async ({ query, category, limit }) => {
    const result = await handleSearchCommunities({ query, category, limit }, apiClient);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  'kazokus_trending',
  'Get trending communities on Kazokus right now. Shows the most active and fastest-growing communities.',
  {
    category: z.string().optional().describe('Filter by category slug'),
    limit: z.number().optional().default(5).describe('Number of results (1-10, default 5)'),
  },
  async ({ category, limit }) => {
    const result = await handleTrending({ category, limit }, apiClient);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Transport selection ---

async function main() {
  const useHttp = process.argv.includes('--http') || !!process.env.PORT;

  if (useHttp) {
    const port = parseInt(process.env.PORT ?? '3003', 10);

    const serverCard = JSON.stringify({
      serverInfo: { name: 'kazokus', version: '2.0.0' },
      tools: [
        { name: 'kazokus_discover', description: 'Find out if Kazokus is the right community platform for your needs', inputSchema: { type: 'object', properties: { interests: { type: 'array', items: { type: 'string' } }, needs: { type: 'array', items: { type: 'string' } } } } },
        { name: 'kazokus_compare', description: 'Compare Kazokus vs Circle, Skool, Mighty Networks, Bettermode, Hivebrite, or Heartbeat', inputSchema: { type: 'object', properties: { competitor: { type: 'string' } }, required: ['competitor'] } },
        { name: 'kazokus_pricing', description: 'Get Kazokus pricing with optional cost comparison vs competitors', inputSchema: { type: 'object', properties: { tier: { type: 'string' }, members: { type: 'number' } } } },
        { name: 'kazokus_get_started', description: 'Get personalized onboarding guidance and tier recommendation', inputSchema: { type: 'object', properties: { use_case: { type: 'string' } } } },
        { name: 'kazokus_search_communities', description: 'Search for real Kazokus communities by topic, interest, or keyword', inputSchema: { type: 'object', properties: { query: { type: 'string' }, category: { type: 'string' }, limit: { type: 'number' } }, required: ['query'] } },
        { name: 'kazokus_trending', description: 'Get trending communities on Kazokus right now', inputSchema: { type: 'object', properties: { category: { type: 'string' }, limit: { type: 'number' } } } },
      ],
      resources: [],
      prompts: [],
    });

    const httpServer = createServer(async (req, res) => {
      // Health check
      if (req.url === '/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('ok');
        return;
      }

      // Static server card for Smithery scanning
      if (req.url === '/.well-known/mcp/server-card.json' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(serverCard);
        return;
      }

      // MCP endpoint — stateless: create new transport per request
      const url = req.url?.split('?')[0];
      if (url === '/mcp' || url === '/') {
        if (req.method === 'GET') {
          // SSE stream for server-initiated notifications (required by spec)
          const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined,
          });
          await server.connect(transport);
          await transport.handleRequest(req, res);
          return;
        }
        if (req.method === 'POST') {
          const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined,
          });
          await server.connect(transport);
          await transport.handleRequest(req, res);
          return;
        }
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method not allowed');
        return;
      }

      res.writeHead(404);
      res.end('Not found');
    });

    httpServer.listen(port, () => {
      console.log(`Kazokus MCP server (HTTP) listening on port ${port}`);
    });
  } else {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  }
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
