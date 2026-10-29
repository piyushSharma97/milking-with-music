import { describe, expect, it } from 'vitest';
import { formatTime } from './CommonFunctions';

describe('formatTime', () => {
  it('formats seconds with zero padding', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(9)).toBe('0:09');
    expect(formatTime(65)).toBe('1:05');
  });

  it('supports durations longer than one hour', () => {
    expect(formatTime(3600)).toBe('60:00');
  });
});
