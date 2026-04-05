import { describe, it, expect } from 'vitest';
import { featureCategories, matchFeatures } from '../src/data/features.js';
import { useCases, matchUseCase } from '../src/data/use-cases.js';

describe('features data', () => {
  it('has feature categories', () => {
    expect(featureCategories.length).toBeGreaterThan(0);
  });

  it('matchFeatures returns relevant features for "courses"', () => {
    const matched = matchFeatures(['courses']);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched.some((f) => f.toLowerCase().includes('course'))).toBe(true);
  });

  it('matchFeatures returns relevant features for "events"', () => {
    const matched = matchFeatures(['events']);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched.some((f) => f.toLowerCase().includes('event'))).toBe(true);
  });

  it('matchFeatures returns all platform highlights for empty input', () => {
    const matched = matchFeatures([]);
    expect(matched.length).toBeGreaterThan(0);
  });
});

describe('use cases data', () => {
  it('has use cases', () => {
    expect(useCases.length).toBeGreaterThan(0);
  });

  it('matchUseCase finds a match for "yoga studio"', () => {
    const match = matchUseCase('yoga studio');
    expect(match).toBeDefined();
    expect(match!.recommendedTier).toBeDefined();
  });

  it('matchUseCase returns a default for unknown use case', () => {
    const match = matchUseCase('underwater basket weaving');
    expect(match).toBeDefined();
    expect(match!.recommendedTier).toBeDefined();
  });
});
