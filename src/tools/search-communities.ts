import { KazokusApiClient, type LightCommunity } from '../api/client.js';

interface SearchInput {
  query: string;
  category?: string;
  limit?: number;
}

interface SearchResult {
  communities: LightCommunity[];
  total: number;
  query: string;
  error?: string;
}

export async function handleSearchCommunities(
  input: SearchInput,
  client: KazokusApiClient
): Promise<SearchResult> {
  const limit = Math.min(input.limit ?? 5, 10);
  const result = await client.searchCommunities(input.query, {
    category: input.category,
    limit,
  });

  return {
    communities: result.communities,
    total: result.total,
    query: input.query,
    error: result.error,
  };
}
