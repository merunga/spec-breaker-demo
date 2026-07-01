/**
 * Constrain a value to the inclusive range [min, max].
 *
 * Pure logic (no Phaser dependency) so it is unit-tested in tests/systems/.
 * Used later to keep the paddle within the canvas bounds.
 */
export function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}
