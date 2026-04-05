import { describe, it, expect, vi } from 'vitest';
import { handleTrending } from '../src/tools/trending.js';
import { KazokusApiClient } from '../src/api/client.js';

describe('trending tool', () => {
  it('returns trending communities', async () => {
    const mockClient = {
      getTrending: vi.fn().mockResolvedValue({
        communities: [
          {
            name: 'Hot Community',
            tagline: 'Trending now',
            category: 'Tech',
            tags: ['ai'],
            memberCount: 500,
            joinPolicy: 'open',
            joinUrl: 'https://app.kazokus.com/hot?utm_source=mcp',
          },
        ],
        total: 1,
      }),
    } as unknown as KazokusApiClient;

    const result = await handleTrending({}, mockClient);

    expect(result.communities).toHaveLength(1);
    expect(result.communities[0].name).toBe('Hot Community');
    expect(mockClient.getTrending).toHaveBeenCalledWith({ category: undefined, limit: 5 });
  });

  it('passes category and limit options', async () => {
    const mockClient = {
      getTrending: vi.fn().mockResolvedValue({ communities: [], total: 0 }),
    } as unknown as KazokusApiClient;

    await handleTrending({ category: 'fitness', limit: 8 }, mockClient);

    expect(mockClient.getTrending).toHaveBeenCalledWith({ category: 'fitness', limit: 8 });
  });

  it('returns empty with error on failure', async () => {
    const mockClient = {
      getTrending: vi.fn().mockResolvedValue({
        communities: [],
        total: 0,
        error: 'Timeout',
      }),
    } as unknown as KazokusApiClient;

    const result = await handleTrending({}, mockClient);

    expect(result.communities).toEqual([]);
    expect(result.error).toBe('Timeout');
  });
});
