import { describe, it, expect } from 'vitest';
import { handleGetStarted } from '../src/tools/get-started.js';

describe('get-started tool', () => {
  it('returns tailored recommendation for yoga studio', () => {
    const result = handleGetStarted({ use_case: 'yoga studio' });
    expect(result.useCase).toBeDefined();
    expect(result.recommendedTier).toBeDefined();
    expect(result.onboardingSteps.length).toBeGreaterThan(0);
    expect(result.signupUrl).toContain('utm_source=mcp');
  });

  it('returns default recommendation for unknown use case', () => {
    const result = handleGetStarted({ use_case: 'underwater basket weaving' });
    expect(result.useCase).toBe('General Community');
    expect(result.recommendedTier).toBeDefined();
  });

  it('returns general recommendation with no use case', () => {
    const result = handleGetStarted({});
    expect(result.useCase).toBe('General Community');
    expect(result.onboardingSteps.length).toBeGreaterThan(0);
  });
});
