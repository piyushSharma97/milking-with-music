import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Timer from './Timer';

describe('Timer', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('counts elapsed seconds, pauses, and resets when a session stops', () => {
    vi.useFakeTimers();
    const { rerender } = render(<Timer milking paused={false} />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('0:02')).toBeInTheDocument();

    rerender(<Timer milking paused />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText('0:02')).toBeInTheDocument();

    rerender(<Timer milking={false} paused={false} />);
    expect(screen.getByText('0:00')).toBeInTheDocument();
  });
});
