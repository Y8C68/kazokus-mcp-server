import { describe, it, expect } from 'vitest';
import { handleCompare } from '../src/tools/compare.js';

describe('compare tool', () => {
  it('returns comparison for Circle', () => {
    const result = handleCompare({ competitor: 'circle' });
    expect(result.competitor.name).toBe('Circle.so');
    expect(result.kazokus).toBeDefined();
    expect(result.verdict).toBeDefined();
    expect(result.verdict.length).toBeGreaterThan(0);
  });

  it('handles aliases like "mighty networks"', () => {
    const result = handleCompare({ competitor: 'mighty networks' });
    expect(result.competitor.name).toBe('Mighty Networks');
  });

  it('returns error for unknown competitor', () => {
    const result = handleCompare({ competitor: 'nonexistent' });
    expect(result.error).toBeDefined();
    expect(result.availableCompetitors).toBeDefined();
  });

  it('comparison includes pricing for both platforms', () => {
    const result = handleCompare({ competitor: 'skool' });
    expect(result.competitor.pricing.length).toBeGreaterThan(0);
    expect(result.kazokus.pricing.length).toBeGreaterThan(0);
  });
});
