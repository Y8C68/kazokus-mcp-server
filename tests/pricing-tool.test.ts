import { describe, it, expect } from 'vitest';
import { handlePricing } from '../src/tools/pricing.js';

describe('pricing tool', () => {
  it('returns all tiers when no filter', () => {
    const result = handlePricing({});
    expect(result.tiers.length).toBe(6);
    expect(result.keyAdvantage).toBeDefined();
  });

  it('filters by tier slug', () => {
    const result = handlePricing({ tier: 'growth' });
    expect(result.tiers).toHaveLength(1);
    expect(result.tiers[0].name).toBe('Growth');
  });

  it('includes cost comparison when members provided', () => {
    const result = handlePricing({ members: 5000 });
    expect(result.costComparison).toBeDefined();
    expect(result.costComparison!.kazokus.monthly).toBeLessThan(result.costComparison!.circle.monthly);
  });

  it('returns error for invalid tier', () => {
    const result = handlePricing({ tier: 'nonexistent' });
    expect(result.error).toBeDefined();
  });
});
