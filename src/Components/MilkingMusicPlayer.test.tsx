import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import MilkingMusicPlayer from './MilkingMusicPlayer';

class MockAudio extends EventTarget {
  static instances: MockAudio[] = [];

  currentTime = 0;
  src = '';
  play = vi.fn(() => Promise.resolve());
  pause = vi.fn();

  constructor() {
    super();
    MockAudio.instances.push(this);
  }
}

describe('MilkingMusicPlayer', () => {
  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
    MockAudio.instances = [];
  });

  it('starts playback and saves a completed session', async () => {
    vi.stubGlobal('Audio', MockAudio);
    render(<MilkingMusicPlayer />);
    const audio = MockAudio.instances[0];

    fireEvent.click(screen.getByRole('button', { name: 'Start Milking' }));
    await waitFor(() => expect(audio.play).toHaveBeenCalledOnce());

    fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
    const quantityInput = await screen.findByRole('textbox', { name: 'Milk quantity' });
    fireEvent.change(quantityInput, { target: { value: '4.25' } });
    fireEvent.click(await screen.findByRole('button', { name: 'Save' }));

    await waitFor(() => {
      const savedHistory = JSON.parse(localStorage.getItem('milkingHistory') || '[]');
      expect(savedHistory).toHaveLength(1);
      expect(savedHistory[0].milkQuantity).toBe('4.25');
    });
  });

  it('shows a clear error if the browser rejects audio playback', async () => {
    vi.stubGlobal('Audio', MockAudio);
    render(<MilkingMusicPlayer />);
    const audio = MockAudio.instances[0];
    audio.play.mockRejectedValueOnce(new Error('Playback was blocked'));

    fireEvent.click(screen.getByRole('button', { name: 'Start Milking' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to play this track');
  });
});
