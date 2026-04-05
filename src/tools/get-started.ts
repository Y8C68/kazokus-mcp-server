import { matchUseCase } from '../data/use-cases.js';
import { getTier } from '../data/pricing.js';

interface GetStartedInput {
  use_case?: string;
}

interface GetStartedResult {
  useCase: string;
  description: string;
  recommendedTier: {
    name: string;
    price: string;
    memberLimit: number;
  };
  keyFeatures: string[];
  onboardingSteps: string[];
  signupUrl: string;
  freeToStart: boolean;
}

export function handleGetStarted(input: GetStartedInput): GetStartedResult {
  const useCase = matchUseCase(input.use_case ?? '');
  const tier = getTier(useCase.recommendedTier)!;

  const utmParams = new URLSearchParams({
    utm_source: 'mcp',
    utm_medium: 'ai-assistant',
    utm_campaign: 'get-started',
    utm_content: useCase.slug,
  });

  return {
    useCase: useCase.name,
    description: useCase.description,
    recommendedTier: {
      name: tier.name,
      price: tier.price,
      memberLimit: tier.memberLimit,
    },
    keyFeatures: useCase.keyFeatures,
    onboardingSteps: useCase.onboardingSteps,
    signupUrl: `https://kazokus.com/signup?${utmParams.toString()}`,
    freeToStart: tier.priceMonthly === 0,
  };
}
