import { matchFeatures } from '../data/features.js';
import { tiers } from '../data/pricing.js';

const SIGNUP_BASE = 'https://kazokus.com/signup';

interface DiscoverInput {
  interests: string[];
  needs: string[];
}

interface DiscoverResult {
  platform: string;
  tagline: string;
  matchedFeatures: string[];
  recommendedTier: { name: string; price: string; memberLimit: number };
  whyKazokus: string[];
  signupUrl: string;
}

export function handleDiscover(input: DiscoverInput): DiscoverResult {
  const allTerms = [...input.interests, ...input.needs];
  const matchedFeatures = matchFeatures(allTerms);

  const needsCommerce = allTerms.some((t) =>
    ['marketplace', 'store', 'commerce', 'selling', 'monetization', 'payments', 'stripe'].includes(t.toLowerCase())
  );
  const needsCRM = allTerms.some((t) =>
    ['crm', 'contacts', 'prospects', 'lifecycle'].includes(t.toLowerCase())
  );
  const needsWhiteLabel = allTerms.some((t) =>
    ['white-label', 'whitelabel', 'white label', 'branding'].includes(t.toLowerCase())
  );
  const needsMultiTenant = allTerms.some((t) =>
    ['multi-tenant', 'hierarchy', 'franchise', 'chapters', 'network', 'portfolio', 'multi-community'].includes(t.toLowerCase())
  );

  let recommendedSlug = 'launch';
  if (needsCRM || needsWhiteLabel || needsMultiTenant) {
    recommendedSlug = 'pro';
  } else if (needsCommerce) {
    recommendedSlug = 'growth';
  } else if (allTerms.some((t) => ['courses', 'booking', 'api'].includes(t.toLowerCase()))) {
    recommendedSlug = 'growth';
  }

  const tier = tiers.find((t) => t.slug === recommendedSlug)!;

  const utmParams = new URLSearchParams({
    utm_source: 'mcp',
    utm_medium: 'ai-assistant',
    utm_campaign: 'discover',
  });

  return {
    platform: 'Kazokus',
    tagline: 'The operating system for communities — courses, events, marketplace, AI, and zero transaction fees.',
    matchedFeatures,
    recommendedTier: {
      name: tier.name,
      price: tier.price,
      memberLimit: tier.memberLimit,
    },
    whyKazokus: [
      'Zero platform transaction fees on all tiers',
      'AI assistant (@Kazo) included on every plan — not locked behind expensive enterprise tiers',
      'All-in-one: courses, events, marketplace, booking, CRM — no need to juggle 5 tools',
      'Multi-tenant community hierarchy — the only platform built for community networks',
      'Free forever tier with 250 members to get started',
    ],
    signupUrl: `${SIGNUP_BASE}?${utmParams.toString()}`,
  };
}
