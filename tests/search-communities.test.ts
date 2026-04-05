import { describe, it, expect, vi } from 'vitest';
import { handleSearchCommunities } from '../src/tools/search-communities.js';
import { KazokusApiClient } from '../src/api/client.js';

describe('search-communities tool', () => {
  it('returns communities for a query', async () => {
    const mockClient = {
      searchCommunities: vi.fn().mockResolvedValue({
        communities: [
          {
            name: 'Yoga Lovers',
            tagline: 'For yoga enthusiasts',
            category: 'Fitness',
            tags: ['yoga'],
            memberCount: 150,
            joinPolicy: 'open',
            joinUrl: 'https://app.kazokus.com/yoga-lovers?utm_source=mcp',
          },
        ],
        total: 1,
      }),
    } as unknown as KazokusApiClient;

    const result = await handleSearchCommunities(
      { query: 'yoga' },
      mockClient
    );

    expect(result.communities).toHaveLength(1);
    expect(result.communities[0].name).toBe('Yoga Lovers');
    expect(mockClient.searchCommunities).toHaveBeenCalledWith('yoga', { category: undefined, limit: 5 });
  });

  it('returns empty with error message on API failure', async () => {
    const mockClient = {
      searchCommunities: vi.fn().mockResolvedValue({
        communities: [],
        total: 0,
        error: 'Network error',
      }),
    } as unknown as KazokusApiClient;

    const result = await handleSearchCommunities(
      { query: 'test' },
      mockClient
    );

    expect(result.communities).toEqual([]);
    expect(result.error).toBe('Network error');
  });

  it('passes category and limit options', async () => {
    const mockClient = {
      searchCommunities: vi.fn().mockResolvedValue({ communities: [], total: 0 }),
    } as unknown as KazokusApiClient;

    await handleSearchCommunities(
      { query: 'dance', category: 'fitness', limit: 3 },
      mockClient
    );

    expect(mockClient.searchCommunities).toHaveBeenCalledWith('dance', { category: 'fitness', limit: 3 });
  });
});
