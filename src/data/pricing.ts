export interface Tier {
  slug: string;
  name: string;
  line: 'family' | 'business';
  price: string;
  priceMonthly: number;
  memberLimit: number;
  target: string;
  kreditsPerMember: number;
  highlights: string[];
}

export const tiers: Tier[] = [
  {
    slug: 'family-free',
    name: 'Family Free',
    line: 'family',
    price: '$0/forever',
    priceMonthly: 0,
    memberLimit: 25,
    target: 'Families, hobby groups, sports teams',
    kreditsPerMember: 200,
    highlights: [
      'Discussions, announcements, articles, photo albums',
      'Group messaging (up to 50 people)',
      'SSO (Google, Microsoft, LINE)',
      '@Kazo AI assistant & Universal Translator',
      'Unlimited events with RSVP',
    ],
  },
  {
    slug: 'family-pro',
    name: 'Family Pro',
    line: 'family',
    price: '$19.95/year',
    priceMonthly: 1.66,
    memberLimit: 100,
    target: 'Larger families, active groups',
    kreditsPerMember: 350,
    highlights: [
      'Everything in Family Free',
      'Custom logo, colors, and subdomain',
      'Calendar sync and automated event reminders',
      'Digest emails',
      'Birthday tracking, shared lists, "On This Day" memories',
    ],
  },
  {
    slug: 'launch',
    name: 'Launch',
    line: 'business',
    price: '$0/forever',
    priceMonthly: 0,
    memberLimit: 250,
    target: 'Solo creators testing the platform',
    kreditsPerMember: 500,
    highlights: [
      'Full community toolkit (discussions, articles, events, photo albums)',
      '1 course with video + text lessons',
      'SEO tools (structured data, sitemaps, OG images)',
      'Customizable landing page',
      'Listed in Community Discovery directory',
      'Basic engagement analytics',
    ],
  },
  {
    slug: 'growth',
    name: 'Growth',
    line: 'business',
    price: '$49/month',
    priceMonthly: 49,
    memberLimit: 2500,
    target: 'Growing community businesses',
    kreditsPerMember: 500,
    highlights: [
      'Everything in Launch',
      'Unlimited courses with AI content generation',
      'P2P marketplace, job postings, community storefront',
      'Booking & appointments with custom intake forms',
      'Email marketing (segments, campaigns, mail merge)',
      'REST API (1K req/hr, 10 webhooks)',
      'Custom domain, membership tiers, bulk import',
      'Community Builder Coach (AI)',
    ],
  },
  {
    slug: 'pro',
    name: 'Pro',
    line: 'business',
    price: '$99/month',
    priceMonthly: 99,
    memberLimit: 10000,
    target: 'Established community businesses',
    kreditsPerMember: 500,
    highlights: [
      'Everything in Growth',
      'Integrated Stripe payments (paid events, courses, marketplace)',
      'CRM with contacts & prospects',
      'White-label branding',
      'Vendor storefronts',
      'Paid events with QR code check-in',
      'Completion certificates for courses',
      'REST API (10K req/hr, unlimited webhooks)',
      'Revenue tracking, data export, audit logs',
      '1 parent + 3 child communities (add-on: $49/mo each)',
      'BYOK (Bring Your Own Key) for AI',
      'Priority support',
    ],
  },
  {
    slug: 'portfolio',
    name: 'Portfolio',
    line: 'business',
    price: '$74/month each',
    priceMonthly: 74,
    memberLimit: 10000,
    target: 'Multi-community operators (franchises, networks, associations)',
    kreditsPerMember: 500,
    highlights: [
      'Full Pro features per community',
      'Independent standalone communities (not children)',
      '25% discount vs separate Pro subscriptions',
      'Ideal for franchise networks, school districts, associations',
      'Priority support',
    ],
  },
];

export function getTier(slug: string): Tier | undefined {
  return tiers.find((t) => t.slug === slug);
}

export function getBusinessTiers(): Tier[] {
  return tiers.filter((t) => t.line === 'business');
}

export function getFamilyTiers(): Tier[] {
  return tiers.filter((t) => t.line === 'family');
}

export interface CostComparison {
  members: number;
  kazokus: { tier: string; monthly: number; transactionFee: string };
  circle: { tier: string; monthly: number; transactionFee: string };
  mighty: { tier: string; monthly: number; transactionFee: string };
  skool: { tier: string; monthly: number; transactionFee: string };
}

export function calculateCostComparison(members: number): CostComparison {
  let kazokusTier: Tier;
  if (members <= 250) kazokusTier = tiers.find((t) => t.slug === 'launch')!;
  else if (members <= 2500) kazokusTier = tiers.find((t) => t.slug === 'growth')!;
  else kazokusTier = tiers.find((t) => t.slug === 'pro')!;

  let circleTier: string;
  let circleMonthly: number;
  let circleTxFee: string;
  if (members <= 1000) {
    circleTier = 'Professional';
    circleMonthly = 89;
    circleTxFee = '2% + Stripe 2.9%';
  } else if (members <= 5000) {
    circleTier = 'Business';
    circleMonthly = 199;
    circleTxFee = '~1% + Stripe 2.9%';
  } else {
    circleTier = 'Enterprise';
    circleMonthly = 419;
    circleTxFee = '0.5% + Stripe 2.9%';
  }

  let mightyTier: string;
  let mightyMonthly: number;
  let mightyTxFee: string;
  if (members <= 500) {
    mightyTier = 'Community';
    mightyMonthly = 49;
    mightyTxFee = '3%';
  } else if (members <= 2000) {
    mightyTier = 'Courses';
    mightyMonthly = 99;
    mightyTxFee = '2%';
  } else {
    mightyTier = 'Business';
    mightyMonthly = 179;
    mightyTxFee = '~1%';
  }

  const skoolMonthly = members <= 100 ? 9 : 99;
  const skoolTier = members <= 100 ? 'Hobby' : 'Pro';
  const skoolTxFee = members <= 100 ? '10%' : '2.9% (Stripe)';

  return {
    members,
    kazokus: {
      tier: kazokusTier.name,
      monthly: kazokusTier.priceMonthly,
      transactionFee: '0%',
    },
    circle: { tier: circleTier, monthly: circleMonthly, transactionFee: circleTxFee },
    mighty: { tier: mightyTier, monthly: mightyMonthly, transactionFee: mightyTxFee },
    skool: { tier: skoolTier, monthly: skoolMonthly, transactionFee: skoolTxFee },
  };
}
