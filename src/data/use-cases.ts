export interface UseCase {
  slug: string;
  keywords: string[];
  name: string;
  description: string;
  recommendedTier: string;
  keyFeatures: string[];
  onboardingSteps: string[];
}

const defaultOnboarding: string[] = [
  'Sign up at https://kazokus.com (free, no credit card required)',
  'Create your community with a name, description, and category',
  'Customize your landing page and branding',
  'Invite your first members via email or share your community link',
  'Set up your first discussion room or post an announcement',
];

export const useCases: UseCase[] = [
  {
    slug: 'fitness-studio',
    keywords: ['fitness', 'gym', 'yoga', 'pilates', 'crossfit', 'workout', 'personal trainer', 'dance', 'ballet', 'martial arts', 'dojo', 'studio'],
    name: 'Fitness & Dance Studios',
    description: 'Build a community around your studio with class bookings, member engagement, and course content.',
    recommendedTier: 'growth',
    keyFeatures: [
      'Booking system for classes and private sessions',
      'Course builder for on-demand video content',
      'Events for workshops and special classes',
      'Member directory to build connections',
      'Marketplace for merchandise or equipment',
    ],
    onboardingSteps: [
      ...defaultOnboarding,
      'Set up booking with your class schedule and instructor availability',
      'Create your first course with recorded classes',
    ],
  },
  {
    slug: 'online-course-creator',
    keywords: ['course', 'creator', 'teacher', 'instructor', 'coach', 'educator', 'training', 'learning', 'tutoring', 'education'],
    name: 'Online Course Creators',
    description: 'Launch and sell courses with built-in community, discussions, and zero transaction fees.',
    recommendedTier: 'pro',
    keyFeatures: [
      'Course builder with video + text lessons and progress tracking',
      'Paid courses via integrated Stripe (zero platform fees)',
      'Completion certificates for students',
      'Course-specific discussion rooms',
      'AI-assisted content generation',
      'Email marketing to nurture and convert leads',
    ],
    onboardingSteps: [
      ...defaultOnboarding,
      'Build your first course with lessons and modules',
      'Connect Stripe to accept payments',
      'Set up email campaigns for launch',
    ],
  },
  {
    slug: 'faith-community',
    keywords: ['church', 'faith', 'religious', 'ministry', 'mosque', 'temple', 'synagogue', 'parish', 'congregation', 'spiritual'],
    name: 'Faith Communities & Churches',
    description: 'Connect your congregation with events, groups, and multi-location management.',
    recommendedTier: 'growth',
    keyFeatures: [
      'Events for services, Bible studies, youth groups',
      'Multi-community hierarchy for chapters or campuses',
      'Member directory with profiles',
      'Photo albums for church events',
      'Announcements for weekly updates',
    ],
    onboardingSteps: [
      ...defaultOnboarding,
      'Create child communities for small groups or ministries',
      'Set up recurring events for regular services',
    ],
  },
  {
    slug: 'professional-association',
    keywords: ['association', 'professional', 'network', 'chapter', 'alumni', 'membership', 'organization', 'nonprofit', 'ngo'],
    name: 'Professional Associations & Alumni Networks',
    description: 'Manage chapters, events, and member engagement across your organization at a fraction of Hivebrite pricing.',
    recommendedTier: 'pro',
    keyFeatures: [
      'Multi-tenant hierarchy for regional chapters',
      'Job board via marketplace',
      'CRM for member lifecycle management',
      'Events with paid ticketing and QR check-in',
      'Analytics and data export',
      'Portfolio pricing for additional chapters ($74/mo each)',
    ],
    onboardingSteps: [
      ...defaultOnboarding,
      'Set up child communities for each chapter or region',
      'Configure the marketplace for job postings',
      'Import existing members in bulk',
    ],
  },
  {
    slug: 'franchise-network',
    keywords: ['franchise', 'chain', 'locations', 'branches', 'multi-location', 'network', 'districts', 'school district'],
    name: 'Franchise Networks & Multi-Location Businesses',
    description: 'The only community platform built for multi-tenant operations. Manage 20+ locations at $99/mo instead of $89/mo each on Circle.',
    recommendedTier: 'pro',
    keyFeatures: [
      'Three-level community hierarchy (parent > child > grandchild)',
      'Content surfacing across communities',
      'Portfolio pricing: $74/mo per additional community',
      'Shared or independent member directories',
      'Network-level analytics (coming soon)',
    ],
    onboardingSteps: [
      ...defaultOnboarding,
      'Create child communities for each location',
      'Configure content surfacing between parent and children',
      'Invite location managers with appropriate roles',
    ],
  },
  {
    slug: 'family-group',
    keywords: ['family', 'relatives', 'parents', 'group', 'friends', 'hobby', 'club', 'sports team', 'book club', 'personal'],
    name: 'Family & Friend Groups',
    description: 'A private space for your family or close group — free forever, with photo sharing, events, and messaging.',
    recommendedTier: 'family-free',
    keyFeatures: [
      'Photo albums for sharing memories',
      'Events with RSVP for gatherings',
      'Group messaging',
      'Member directory',
      'Completely free for up to 25 members',
    ],
    onboardingSteps: [
      'Sign up at https://kazokus.com (free, no credit card required)',
      'Create your family community (private by default)',
      'Invite family members via email or link',
      'Share your first photo album',
      'Create an event for your next gathering',
    ],
  },
  {
    slug: 'saas-customer-community',
    keywords: ['saas', 'customer', 'support', 'product', 'feedback', 'knowledge base', 'help', 'b2b', 'software'],
    name: 'SaaS Customer Communities',
    description: 'Build a customer community for feedback, support, and engagement — at a fraction of Bettermode pricing.',
    recommendedTier: 'growth',
    keyFeatures: [
      'Discussions for product feedback and feature requests',
      'Knowledge base via articles',
      'REST API for integration with your product',
      'CRM for customer tracking (Pro)',
      'Analytics for engagement insights',
    ],
    onboardingSteps: [
      ...defaultOnboarding,
      'Set up discussion categories for feedback, bugs, and feature requests',
      'Create knowledge base articles',
      'Connect via REST API for SSO with your product',
    ],
  },
  {
    slug: 'japan-apac',
    keywords: ['japan', 'japanese', 'line', 'asia', 'apac', 'taiwan', 'thailand', 'indonesia', 'asian'],
    name: 'Japan & APAC Communities',
    description: 'The only community platform with native LINE integration — login, notifications, and messaging for the Asian market.',
    recommendedTier: 'growth',
    keyFeatures: [
      'LINE Login (all tiers)',
      'LINE push notifications via Messaging API',
      'Universal Translator for multilingual communities',
      'SSO with Google and Microsoft',
      'Built for cross-cultural and diaspora communities',
    ],
    onboardingSteps: [
      ...defaultOnboarding,
      'Enable LINE Login for your community',
      'Set up LINE notifications for events and announcements',
      'Enable Universal Translator for multilingual support',
    ],
  },
];

const defaultUseCase: UseCase = {
  slug: 'general',
  keywords: [],
  name: 'General Community',
  description: 'Build any type of community with Kazokus — from hobbyist groups to professional networks.',
  recommendedTier: 'launch',
  keyFeatures: [
    'Discussions, articles, and announcements',
    'Events with RSVP management',
    'Member directory and profiles',
    'Photo albums and file sharing',
    '@Kazo AI assistant',
    'Free forever with up to 250 members',
  ],
  onboardingSteps: defaultOnboarding,
};

export function matchUseCase(input: string): UseCase {
  const normalized = input.toLowerCase().trim();
  const match = useCases.find((uc) =>
    uc.keywords.some((kw) => normalized.includes(kw) || kw.includes(normalized))
  );
  return match ?? defaultUseCase;
}
