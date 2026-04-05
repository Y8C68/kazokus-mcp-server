export interface CompetitorPlan {
  name: string;
  price: string;
  transactionFee: string;
  notes?: string;
}

export interface Competitor {
  slug: string;
  aliases: string[];
  name: string;
  position: string;
  pricing: CompetitorPlan[];
  strengths: string[];
  weaknesses: string[];
  userComplaints: string[];
  kazokusAdvantages: string[];
}

export const competitors: Competitor[] = [
  {
    slug: 'circle',
    aliases: ['circle.so', 'circleso'],
    name: 'Circle.so',
    position: 'Market leader for creator and brand communities. $29M+ funding.',
    pricing: [
      { name: 'Professional', price: '$89/mo', transactionFee: '2% + Stripe fees' },
      { name: 'Business', price: '$199/mo', transactionFee: 'Lower + Stripe fees' },
      { name: 'Enterprise', price: '$419/mo', transactionFee: '0.5% + Stripe fees' },
    ],
    strengths: [
      'Most comprehensive AI features (AI Agents, Workflows, Activity Scores) — but locked behind $419+/mo',
      'Clean, modern UX with strong brand recognition',
      'Full course hosting and gamification (3.0)',
    ],
    weaknesses: [
      'Steep pricing jumps — advanced features gated behind $199-419/mo',
      'Transaction fees compound with Stripe fees at scale',
      'No marketplace, no bookings, no multi-tenancy',
      'Video/live events quality poor vs Zoom',
      'Trustpilot: 2.0/5 stars (60% 1-star reviews)',
    ],
    userComplaints: [
      '"Selling $10,000 in memberships means handing over $100-$200" on top of subscription',
      'Price increases without notice ($89 to $129)',
      '"Videos frequently won\'t load or play"',
      '"Dangerously easy to delete entire modules by accident with no recovery"',
      'Support: "No timely responses," chat disconnections',
    ],
    kazokusAdvantages: [
      'Zero platform transaction fees (vs 0.5-2% on Circle)',
      'AI on all tiers via Kredits — not locked behind $419/mo',
      'Multi-tenancy and hierarchical communities (Circle has neither)',
      'Built-in marketplace, booking system, and CRM',
      '10x cheaper for a 5,000-member community ($99 vs $419)',
    ],
  },
  {
    slug: 'mighty-networks',
    aliases: ['mighty', 'mighty networks', 'mightynetworks'],
    name: 'Mighty Networks',
    position: 'All-in-one community + courses + memberships. Founded 2017.',
    pricing: [
      { name: 'Community', price: '$49/mo', transactionFee: '3%' },
      { name: 'Courses', price: '$99/mo', transactionFee: '2%' },
      { name: 'Business', price: '$179/mo', transactionFee: 'Lower' },
      { name: 'Mighty Pro', price: '~$33K/year', transactionFee: 'Custom' },
    ],
    strengths: [
      '"People Magic" AI for member matching and re-engagement',
      'Strong mobile-first design',
      'All-in-one approach (community + courses + events + memberships)',
    ],
    weaknesses: [
      'No hashtags or topic tagging — 80-90% of user complaints',
      'No API and very limited integrations',
      'Transaction fees (2-3%) on top of subscription',
      'Limited course features (no certificates, quizzes, progress tracking)',
      'Cluttered interface — members report difficulty finding content',
    ],
    userComplaints: [
      '"Clunky interface, limited course features, and poor integrations"',
      '"Constant bug issues, clunky interfaces, broken features"',
      'Chat doesn\'t always update, requires manual refresh',
      'Push notifications slow or non-functional',
      'Support takes days to answer',
    ],
    kazokusAdvantages: [
      'Zero transaction fees (vs 2-3%)',
      'REST API available from Growth tier ($49/mo)',
      'Better course features: certificates, progress tracking, AI content generation',
      'Hierarchical communities and multi-tenancy',
      'Marketplace, bookings, and CRM included',
      'LINE integration for APAC market',
    ],
  },
  {
    slug: 'skool',
    aliases: ['skool.com'],
    name: 'Skool',
    position: 'Simplest community + course platform. 174K+ communities. Alex Hormozi partnership.',
    pricing: [
      { name: 'Hobby', price: '$9/mo', transactionFee: '10%' },
      { name: 'Pro', price: '$99/mo', transactionFee: '2.9% (Stripe standard)' },
    ],
    strengths: [
      'Radical simplicity — intentionally limited, fast setup',
      'Built-in discovery marketplace (key growth driver)',
      'Strong gamification (points, levels, leaderboards, streaks)',
      '$9/mo Hobby plan undercuts all competitors',
    ],
    weaknesses: [
      'No white-labeling or branding customization at all',
      'Single group per community — no sub-spaces',
      'Not a full LMS — no assessments, grading, certificates',
      'No marketing/sales tools — no landing pages, email, funnels',
      'Zero AI features',
      'One community per subscription',
      'All communities look identical (platform lock-in)',
    ],
    userComplaints: [
      '"Extremely basic — virtually every community platform has features Skool doesn\'t"',
      'Interface "feels cheap and outdated"',
      'Terms of Service allow Skool to "own, sell, and profit from user content"',
      '10-category cap frustrates creators',
    ],
    kazokusAdvantages: [
      'Full branding and white-label options',
      'Multi-community management',
      'Marketplace, events with QR ticketing, booking system',
      '@Kazo AI assistant on all tiers',
      'Courses with certificates and progress tracking',
      'Discovery marketplace (matching Skool\'s key strength)',
      'Kredits economy for engagement mechanics',
    ],
  },
  {
    slug: 'bettermode',
    aliases: ['bettermode.com', 'tribe', 'tribe.so'],
    name: 'Bettermode',
    position: 'Enterprise-grade, developer-friendly customer community. Formerly Tribe.so.',
    pricing: [
      { name: 'Starter', price: '$49/mo', transactionFee: 'N/A' },
      { name: 'Growth', price: '$199/mo', transactionFee: 'N/A' },
      { name: 'Advanced', price: '$599/mo', transactionFee: 'N/A' },
      { name: 'Enterprise', price: 'Custom', transactionFee: 'N/A' },
    ],
    strengths: [
      'Embeddable widgets — drop community into any website (unique)',
      'Strong GraphQL API and developer ecosystem',
      'Multilingual support (30+ languages)',
      'GDPR-compliant AI (runs on own infrastructure)',
    ],
    weaknesses: [
      'Aggressive price hikes ($50 to $399 jump reported)',
      'Customer support extremely slow (72+ hours)',
      'Steep learning curve',
      'Enterprise positioning limits SMB adoption',
      'White-label is an add-on, not included',
    ],
    userComplaints: [
      'Drastic price increases without adequate notice',
      'Support response times of 72+ hours',
      'Community deletion reports',
      'No-code limitations affecting SEO',
    ],
    kazokusAdvantages: [
      'Much better pricing for SMB ($49-99 vs $199-599)',
      'AI on all tiers via Kredits (not enterprise-only)',
      'Marketplace, events, courses, bookings all included',
      'Multi-tenancy built in',
      'Zero transaction fees',
    ],
  },
  {
    slug: 'hivebrite',
    aliases: ['hivebrite.com'],
    name: 'Hivebrite',
    position: 'Premium community management for organizations, alumni, associations.',
    pricing: [
      { name: 'Connect', price: 'From $799/mo', transactionFee: 'N/A' },
      { name: 'Scale', price: 'Custom', transactionFee: 'N/A' },
      { name: 'Enterprise', price: 'Custom', transactionFee: 'N/A' },
    ],
    strengths: [
      'Purpose-built for structured organizations (alumni, associations)',
      'Native job board and fundraising tools',
      'Geographic member mapping',
      'High-touch customer success',
    ],
    weaknesses: [
      'Very expensive — starts at $799/mo, minimum ~$9.6K/year',
      'Narrow use case (not for creators or courses)',
      'Opaque pricing (requires sales calls)',
      'No free tier or trial',
    ],
    userComplaints: [
      'Price prohibitive for smaller organizations',
      'No transparency in pricing',
    ],
    kazokusAdvantages: [
      '20x cheaper ($99/mo vs $799/mo for less functionality)',
      'Community + courses + marketplace + AI included',
      'Multi-tenancy competes for chapters/regional networks use case',
      'Free tier available to get started',
    ],
  },
  {
    slug: 'heartbeat',
    aliases: ['heartbeat.chat', 'heartbeatchat'],
    name: 'Heartbeat.chat',
    position: 'Affordable, relationship-focused community for creators.',
    pricing: [
      { name: 'Starter', price: '~$40/mo', transactionFee: 'N/A' },
      { name: 'Mid', price: '~$100/mo', transactionFee: 'N/A' },
      { name: 'Pro', price: '~$333/mo', transactionFee: 'N/A' },
    ],
    strengths: [
      'Cohort-based courses (unique strength)',
      'Voice channels for live audio',
      'Workflow automations (DMs, emails, popups)',
      'Relationship-focused design',
    ],
    weaknesses: [
      'Less established brand and smaller ecosystem',
      'Early-stage API (v0)',
      'Limited documentation',
    ],
    userComplaints: [
      'Smaller community of users — fewer resources and templates',
      'Limited third-party integrations',
    ],
    kazokusAdvantages: [
      'More complete platform (marketplace, bookings, CRM, multi-tenancy)',
      'Kredits economy for engagement',
      'Zero transaction fees',
      'LINE integration for APAC',
      'More mature REST API',
    ],
  },
];

export function getCompetitor(input: string): Competitor | undefined {
  const normalized = input.toLowerCase().trim().replace(/\s+/g, '-');
  return competitors.find(
    (c) =>
      c.slug === normalized ||
      c.aliases.some((a) => a.toLowerCase().replace(/\s+/g, '-') === normalized) ||
      c.aliases.some((a) => a.toLowerCase() === input.toLowerCase().trim())
  );
}

export function getAllCompetitorSlugs(): string[] {
  return competitors.map((c) => c.slug);
}
