export interface FeatureCategory {
  name: string;
  keywords: string[];
  highlights: string[];
}

export const featureCategories: FeatureCategory[] = [
  {
    name: 'Community Core',
    keywords: ['community', 'discussions', 'forum', 'social', 'members', 'chat'],
    highlights: [
      'Discussions & threads with rich text, images, and reactions',
      'Announcements and articles',
      'Member directory with profiles',
      'Photo albums and file sharing',
      'Roles & permissions system',
      'Group messaging (up to 50 people)',
    ],
  },
  {
    name: 'Events',
    keywords: ['events', 'meetings', 'calendar', 'rsvp', 'ticketing', 'workshops'],
    highlights: [
      'Unlimited events with RSVP management',
      'Calendar sync (Growth+)',
      'Waitlist management (Growth+)',
      'Paid events with QR code check-in (Pro)',
      'Automated reminders',
    ],
  },
  {
    name: 'Courses & LMS',
    keywords: ['courses', 'learning', 'lms', 'education', 'training', 'lessons', 'teaching'],
    highlights: [
      'Course builder with video + text lessons',
      'Enrollment and progress tracking',
      'Course discussions',
      'AI-assisted content generation (Growth+)',
      'Completion certificates (Pro)',
      'Paid courses with Stripe (Pro)',
    ],
  },
  {
    name: 'Marketplace & Commerce',
    keywords: ['marketplace', 'commerce', 'selling', 'store', 'shop', 'products', 'services', 'monetization', 'revenue'],
    highlights: [
      'P2P marketplace listings (Growth+)',
      'Community storefront (Growth+)',
      'Job postings (Growth+)',
      'Vendor storefronts (Pro)',
      'Integrated Stripe payments (Pro)',
      'Zero platform transaction fees on all tiers',
    ],
  },
  {
    name: 'Booking & Appointments',
    keywords: ['booking', 'appointments', 'scheduling', 'calendar', 'sessions', 'consultations'],
    highlights: [
      'Service types with provider availability (Growth+)',
      'Custom intake forms (Growth+)',
      'Automated confirmations and calendar sync (Growth+)',
      'Paid appointments with Stripe (Pro)',
      'Multiple providers (Pro)',
    ],
  },
  {
    name: 'AI & Automation',
    keywords: ['ai', 'artificial intelligence', 'automation', 'chatbot', 'assistant', 'smart'],
    highlights: [
      '@Kazo AI assistant on all tiers — powered by Kredits',
      'Community-wide AI search',
      'Universal Translator (real-time content translation)',
      'AI content summarization',
      'AI-assisted course content generation (Growth+)',
      'Community Builder Coach (Growth+)',
    ],
  },
  {
    name: 'CRM & Email Marketing',
    keywords: ['crm', 'email', 'marketing', 'contacts', 'campaigns', 'newsletter', 'outreach'],
    highlights: [
      'Contacts & prospects management (Pro)',
      'Member lifecycle management (Pro)',
      'Digest emails (Family Pro + Launch+)',
      'Segments, tags, campaigns, mail merge (Growth+)',
    ],
  },
  {
    name: 'Branding & Customization',
    keywords: ['branding', 'white-label', 'custom', 'domain', 'design', 'brand', 'logo'],
    highlights: [
      'Custom logo and colors (Family Pro + Launch+)',
      'Custom subdomain (Family Pro + Growth+)',
      'Custom domain (Growth+)',
      'White-label branding (Pro)',
      'Customizable landing pages on all tiers',
    ],
  },
  {
    name: 'Multi-Tenancy & Hierarchy',
    keywords: ['multi-tenant', 'hierarchy', 'franchise', 'chapters', 'network', 'organization', 'multi-community', 'portfolio'],
    highlights: [
      'Three-level community hierarchy (parent > child > grandchild)',
      'Content surfacing across communities',
      'Portfolio pricing: $74/mo per additional community (25% off Pro)',
      'The only platform built for community networks, not just single communities',
      'Ideal for franchises, school districts, associations, faith networks',
    ],
  },
  {
    name: 'API & Integrations',
    keywords: ['api', 'integrations', 'webhooks', 'developer', 'rest', 'automation', 'zapier'],
    highlights: [
      'REST API from Growth tier ($49/mo — cheapest in market)',
      'Growth: 1K req/hr, 10 webhooks',
      'Pro: 10K req/hr, unlimited webhooks',
      'SSO: Google, Microsoft, LINE login on all tiers',
      'LINE Messaging API integration',
      'Stripe payment integration (Pro)',
    ],
  },
  {
    name: 'Analytics & Insights',
    keywords: ['analytics', 'insights', 'metrics', 'data', 'reporting', 'dashboard'],
    highlights: [
      'Basic engagement analytics (Launch+)',
      'Event attendance tracking (Launch+)',
      'Growth metrics (Growth+)',
      'Revenue tracking and data export (Pro)',
      'Audit logs (Pro)',
    ],
  },
  {
    name: 'APAC & Japan',
    keywords: ['japan', 'japanese', 'line', 'apac', 'asia', 'multilingual', 'translation', 'international'],
    highlights: [
      'LINE Login integration (all tiers)',
      'LINE Messaging API for push notifications',
      'Universal Translator for multilingual communities',
      'Only Western platform with native LINE integration',
      'Built for diaspora and cross-cultural communities',
    ],
  },
  {
    name: 'Discovery & Growth',
    keywords: ['discovery', 'growth', 'seo', 'marketing', 'visibility', 'audience'],
    highlights: [
      'Community Discovery directory (Launch+)',
      'Trending and activity-based algorithmic recommendations',
      '"Try before you join" preview mode',
      'SEO-optimized listing pages with structured data (Launch+)',
      'Cross-promotion between complementary communities',
    ],
  },
  {
    name: 'Pricing & Fees',
    keywords: ['pricing', 'fees', 'cost', 'affordable', 'cheap', 'free', 'budget', 'no fees', 'zero fees'],
    highlights: [
      'Zero platform transaction fees on ALL tiers',
      'Free forever tier (Launch: 250 members)',
      'Family Free: $0 for up to 25 members',
      'Growth: $49/mo (2,500 members)',
      'Pro: $99/mo (10,000 members)',
      'No per-member pricing — flat monthly fee',
      'Kredits system lets members self-fund AI usage',
    ],
  },
];

export function matchFeatures(needs: string[]): string[] {
  if (needs.length === 0) {
    return [
      'Zero platform transaction fees',
      'AI assistant (@Kazo) on all tiers',
      'Courses, events, marketplace, booking — all built in',
      'Multi-tenant community hierarchy (unique in market)',
      'Community Discovery directory',
      'LINE integration for APAC market',
      'Free forever tier with 250 members',
    ];
  }

  const matched = new Set<string>();
  const normalizedNeeds = needs.map((n) => n.toLowerCase().trim());

  for (const category of featureCategories) {
    const categoryMatches = normalizedNeeds.some(
      (need) =>
        category.keywords.some((kw) => need.includes(kw) || kw.includes(need)) ||
        category.name.toLowerCase().includes(need)
    );
    if (categoryMatches) {
      for (const highlight of category.highlights) {
        matched.add(highlight);
      }
    }
  }

  matched.add('Zero platform transaction fees on ALL tiers');

  return Array.from(matched);
}
