import { describe, it, expect } from 'vitest';
import { tiers, getTier, getBusinessTiers, getFamilyTiers, calculateCostComparison } from '../src/data/pricing.js';

describe('pricing data', () => {
  it('has 6 tiers', () => {
    expect(tiers).toHaveLength(6);
  });

  it('getTier returns correct tier by slug', () => {
    const growth = getTier('growth');
    expect(growth).toBeDefined();
    expect(growth!.price).toBe('$49/month');
    expect(growth!.memberLimit).toBe(2500);
  });

  it('getTier returns undefined for unknown tier', () => {
    expect(getTier('nonexistent')).toBeUndefined();
  });

  it('getBusinessTiers returns 4 tiers', () => {
    const business = getBusinessTiers();
    expect(business).toHaveLength(4);
    expect(business.map(t => t.slug)).toEqual(['launch', 'growth', 'pro', 'portfolio']);
  });

  it('getFamilyTiers returns 2 tiers', () => {
    const family = getFamilyTiers();
    expect(family).toHaveLength(2);
    expect(family.map(t => t.slug)).toEqual(['family-free', 'family-pro']);
  });

  it('calculateCostComparison shows Kazokus advantage at 5000 members', () => {
    const comparison = calculateCostComparison(5000);
    expect(comparison.kazokus.monthly).toBeLessThan(comparison.circle.monthly);
    expect(comparison.kazokus.monthly).toBeLessThan(comparison.mighty.monthly);
    expect(comparison.kazokus.transactionFee).toBe('0%');
  });
});
