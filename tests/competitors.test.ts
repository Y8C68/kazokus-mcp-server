import { describe, it, expect } from 'vitest';
import { competitors, getCompetitor, getAllCompetitorSlugs } from '../src/data/competitors.js';

describe('competitors data', () => {
  it('has 6 competitors', () => {
    expect(competitors).toHaveLength(6);
  });

  it('getCompetitor returns Circle by slug', () => {
    const circle = getCompetitor('circle');
    expect(circle).toBeDefined();
    expect(circle!.name).toBe('Circle.so');
    expect(circle!.kazokusAdvantages.length).toBeGreaterThan(0);
  });

  it('getCompetitor handles aliases', () => {
    expect(getCompetitor('mighty-networks')).toBeDefined();
    expect(getCompetitor('mighty')).toBeDefined();
    expect(getCompetitor('mighty networks')).toBeDefined();
  });

  it('getCompetitor returns undefined for unknown', () => {
    expect(getCompetitor('nonexistent')).toBeUndefined();
  });

  it('getAllCompetitorSlugs returns all slugs', () => {
    const slugs = getAllCompetitorSlugs();
    expect(slugs).toContain('circle');
    expect(slugs).toContain('skool');
    expect(slugs).toContain('mighty-networks');
  });

  it('every competitor has pricing, strengths, weaknesses, and kazokus advantages', () => {
    for (const comp of competitors) {
      expect(comp.pricing.length).toBeGreaterThan(0);
      expect(comp.strengths.length).toBeGreaterThan(0);
      expect(comp.weaknesses.length).toBeGreaterThan(0);
      expect(comp.kazokusAdvantages.length).toBeGreaterThan(0);
    }
  });
});
