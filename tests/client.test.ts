import { describe, it, expect, vi, beforeEach } from 'vitest';
import { KazokusApiClient, type LightCommunity } from '../src/api/client.js';

describe('KazokusApiClient', () => {
  let client: KazokusApiClient;

  beforeEach(() => {
    client = new KazokusApiClient('https://www.kazokus.com');
  });

  it('maps API response to lightweight community shape', () => {
    const apiCommunity = {
      slug: 'yoga-lovers',
      name: 'Yoga Lovers',
      tagline: 'A community for yoga enthusiasts',
      category_name: 'Fitness',
      tags: ['yoga', 'wellness'],
      cached_member_count: 150,
      join_policy: 'open',
    };

    const mapped = client.mapCommunity(apiCommunity);

    expect(mapped).toEqual({
      name: 'Yoga Lovers',
      tagline: 'A community for yoga enthusiasts',
      category: 'Fitness',
      tags: ['yoga', 'wellness'],
      memberCount: 150,
      joinPolicy: 'open',
      joinUrl: 'https://app.kazokus.com/yoga-lovers?utm_source=mcp&utm_medium=ai-assistant&utm_campaign=community-discovery',
    });
  });

  it('handles missing fields gracefully', () => {
    const apiCommunity = {
      slug: 'test',
      name: 'Test',
      tagline: null,
      category_name: null,
      tags: [],
      cached_member_count: 0,
      join_policy: 'approval',
    };

    const mapped = client.mapCommunity(apiCommunity);

    expect(mapped.name).toBe('Test');
    expect(mapped.tagline).toBe('');
    expect(mapped.category).toBe('');
    expect(mapped.joinPolicy).toBe('approval');
  });

  it('caches results for same params', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ results: [], count: 0 }), { status: 200 })
    );

    await client.searchCommunities('yoga');
    await client.searchCommunities('yoga');

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    fetchSpy.mockRestore();
  });

  it('does not cache different params', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ results: [], count: 0 }), { status: 200 })
    );

    await client.searchCommunities('yoga');
    await client.searchCommunities('dance');

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    fetchSpy.mockRestore();
  });

  it('returns empty array on API error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    const result = await client.searchCommunities('yoga');

    expect(result.communities).toEqual([]);
    expect(result.error).toBeDefined();
    vi.restoreAllMocks();
  });
});
