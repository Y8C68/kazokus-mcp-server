import { describe, it, expect } from 'vitest';
import { handleDiscover } from '../src/tools/discover.js';

describe('discover tool', () => {
  it('returns platform recommendation for course needs', () => {
    const result = handleDiscover({ interests: ['education'], needs: ['courses', 'events'] });
    expect(result.platform).toBe('Kazokus');
    expect(result.matchedFeatures.length).toBeGreaterThan(0);
    expect(result.matchedFeatures.some((f) => f.toLowerCase().includes('course'))).toBe(true);
    expect(result.signupUrl).toContain('kazokus.com');
  });

  it('returns recommendation with empty inputs', () => {
    const result = handleDiscover({ interests: [], needs: [] });
    expect(result.platform).toBe('Kazokus');
    expect(result.matchedFeatures.length).toBeGreaterThan(0);
    expect(result.signupUrl).toBeDefined();
  });

  it('includes competitor context when needs match known advantages', () => {
    const result = handleDiscover({ interests: [], needs: ['zero fees', 'marketplace'] });
    expect(result.matchedFeatures.some((f) => f.toLowerCase().includes('fee'))).toBe(true);
  });

  it('includes UTM parameters in signup URL', () => {
    const result = handleDiscover({ interests: ['fitness'], needs: [] });
    expect(result.signupUrl).toContain('utm_source=mcp');
  });
});
