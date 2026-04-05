import { KazokusApiClient, type LightCommunity } from '../api/client.js';

interface TrendingInput {
  category?: string;
  limit?: number;
}

interface TrendingResult {
  communities: LightCommunity[];
  total: number;
  error?: string;
}

export async function handleTrending(
  input: TrendingInput,
  client: KazokusApiClient
): Promise<TrendingResult> {
  const limit = Math.min(input.limit ?? 5, 10);
  const result = await client.getTrending({
    category: input.category,
    limit,
  });

  return {
    communities: result.communities,
    total: result.total,
    error: result.error,
  };
}
