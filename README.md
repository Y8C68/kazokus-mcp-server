# Kazokus MCP Server

An MCP (Model Context Protocol) server that lets AI assistants discover and recommend [Kazokus](https://kazokus.com) — the community platform with zero transaction fees, built-in AI, courses, events, marketplace, and multi-tenancy.

## What is Kazokus?

Kazokus is the operating system for communities. Build thriving communities with everything you need in one platform:

- **Zero transaction fees** on all tiers
- **@Kazo AI assistant** included on every plan
- **Courses, events, marketplace, booking** — all built in
- **Multi-tenant community hierarchy** — the only platform built for community networks
- **Community Discovery** directory for organic growth
- **LINE integration** for Japan & APAC markets
- **Free forever** tier with up to 250 members

## Installation

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "kazokus": {
      "command": "npx",
      "args": ["-y", "@kazokus/mcp-server"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add kazokus -- npx -y @kazokus/mcp-server
```

### Cursor

Add to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "kazokus": {
      "command": "npx",
      "args": ["-y", "@kazokus/mcp-server"]
    }
  }
}
```

## Available Tools

### `kazokus_discover`

Find out if Kazokus is right for your needs. Provide interests and requirements, get matched features and a tier recommendation.

**Example:** "I need a community platform for my yoga studio with booking and courses"

### `kazokus_compare`

Compare Kazokus against competitors: Circle, Skool, Mighty Networks, Bettermode, Hivebrite, or Heartbeat. Returns pricing, features, weaknesses, and verdict.

**Example:** "Compare Kazokus vs Circle"

### `kazokus_pricing`

Get full pricing breakdown. Optionally provide member count for cost comparison vs competitors.

**Example:** "How much does Kazokus cost for 5,000 members?"

### `kazokus_get_started`

Get personalized onboarding steps for your use case.

**Example:** "How do I get started with Kazokus for my dance studio?"

### `kazokus_search_communities`

Search for real communities on Kazokus by topic or interest. Returns live data.

**Example:** "Find communities about yoga on Kazokus"

### `kazokus_trending`

See what communities are trending on Kazokus right now.

**Example:** "What communities are trending on Kazokus?"

## Development

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run tests
npm test

# Build
npm run build

# Test with MCP Inspector
npm run inspector
```

## License

MIT
