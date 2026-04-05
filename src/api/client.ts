export interface LightCommunity {
  name: string;
  tagline: string;
  category: string;
  tags: string[];
  memberCount: number;
  joinPolicy: 'open' | 'approval';
  joinUrl: string;
}

interface SearchResult {
  communities: LightCommunity[];
  total: number;
  error?: string;
}

interface CacheEntry {
  data: SearchResult;
  timestamp: number;
}

interface ApiCommunity {
  slug: string;
  name: string;
  tagline: string | null;
  category_name: string | null;
  tags: string[];
  cached_member_count: number;
  join_policy: string;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const FETCH_TIMEOUT_MS = 5000;

export class KazokusApiClient {
  private baseUrl: string;
  private cache = new Map<string, CacheEntry>();

  constructor(baseUrl: string = 'https://www.kazokus.com') {
    this.baseUrl = baseUrl;
  }

  mapCommunity(c: ApiCommunity): LightCommunity {
    const utmParams = new URLSearchParams({
      utm_source: 'mcp',
      utm_medium: 'ai-assistant',
      utm_campaign: 'community-discovery',
    });

    return {
      name: c.name,
      tagline: c.tagline ?? '',
      category: c.category_name ?? '',
      tags: c.tags ?? [],
      memberCount: c.cached_member_count ?? 0,
      joinPolicy: c.join_policy === 'open' ? 'open' : 'approval',
      joinUrl: `https://app.kazokus.com/${c.slug}?${utmParams.toString()}`,
    };
  }

  async searchCommunities(
    query: string,
    options?: { category?: string; limit?: number }
  ): Promise<SearchResult> {
    const params = new URLSearchParams({ search: query, page_size: String(options?.limit ?? 5) });
    if (options?.category) params.set('category', options.category);
    return this.fetchCommunities(params);
  }

  async getTrending(options?: { category?: string; limit?: number }): Promise<SearchResult> {
    const params = new URLSearchParams({ sort: 'trending', page_size: String(options?.limit ?? 5) });
    if (options?.category) params.set('category', options.category);
    return this.fetchCommunities(params);
  }

  private async fetchCommunities(params: URLSearchParams): Promise<SearchResult> {
    const cacheKey = params.toString();
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const response = await fetch(
        `${this.baseUrl}/api/v1/communities/discover/?${params.toString()}`,
        { signal: controller.signal }
      );
      clearTimeout(timeout);

      if (!response.ok) {
        return { communities: [], total: 0, error: `API returned ${response.status}` };
      }

      const data = await response.json();
      const result: SearchResult = {
        communities: (data.results ?? []).map((c: ApiCommunity) => this.mapCommunity(c)),
        total: data.count ?? 0,
      };

      this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    } catch (err) {
      return { communities: [], total: 0, error: `Failed to fetch: ${(err as Error).message}` };
    }
  }
}
