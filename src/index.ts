#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { handleDiscover } from './tools/discover.js';
import { handleCompare } from './tools/compare.js';
import { handlePricing } from './tools/pricing.js';
import { handleGetStarted } from './tools/get-started.js';

const server = new McpServer({
  name: 'kazokus',
  version: '1.0.0',
});

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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
