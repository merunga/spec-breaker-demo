import { describe, it, expect } from 'vitest';
import { clamp } from '../../src/systems/clamp';

describe('clamp', () => {
  it('returns the value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('clamps to the lower bound when below range', () => {
    expect(clamp(-3, 0, 10)).toBe(0);
  });

  it('clamps to the upper bound when above range', () => {
    expect(clamp(42, 0, 10)).toBe(10);
  });

  it('returns the bound when the value equals it', () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
});
