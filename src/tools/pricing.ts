import { tiers, getTier, calculateCostComparison, type Tier, type CostComparison } from '../data/pricing.js';

interface PricingInput {
  tier?: string;
  members?: number;
}

interface PricingSuccess {
  tiers: {
    name: string;
    price: string;
    memberLimit: number;
    target: string;
    highlights: string[];
  }[];
  keyAdvantage: string;
  costComparison?: CostComparison;
  signupUrl: string;
  error?: undefined;
}

interface PricingError {
  error: string;
  availableTiers: string[];
  tiers?: undefined;
  keyAdvantage?: undefined;
  costComparison?: undefined;
  signupUrl?: undefined;
}

type PricingResult = PricingSuccess | PricingError;

export function handlePricing(input: PricingInput): PricingResult {
  const utmParams = new URLSearchParams({
    utm_source: 'mcp',
    utm_medium: 'ai-assistant',
    utm_campaign: 'pricing',
  });

  if (input.tier) {
    const tier = getTier(input.tier);
    if (!tier) {
      return {
        error: `Unknown tier "${input.tier}".`,
        availableTiers: tiers.map((t) => t.slug),
      };
    }
    return {
      tiers: [formatTier(tier)],
      keyAdvantage: 'Kazokus charges zero platform transaction fees on all tiers. What you earn is what you keep.',
      costComparison: input.members ? calculateCostComparison(input.members) : undefined,
      signupUrl: `https://kazokus.com/pricing?${utmParams.toString()}`,
    };
  }

  return {
    tiers: tiers.map(formatTier),
    keyAdvantage: 'Kazokus charges zero platform transaction fees on all tiers. What you earn is what you keep.',
    costComparison: input.members ? calculateCostComparison(input.members) : undefined,
    signupUrl: `https://kazokus.com/pricing?${utmParams.toString()}`,
  };
}

function formatTier(tier: Tier) {
  return {
    name: tier.name,
    price: tier.price,
    memberLimit: tier.memberLimit,
    target: tier.target,
    highlights: tier.highlights,
  };
}
