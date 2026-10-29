import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import MilkingHistoryPage from './MilkingHistory';

describe('MilkingHistoryPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays saved sessions and clears them on request', async () => {
    localStorage.setItem('milkingHistory', JSON.stringify([{
      date: '10/29/2026',
      startTime: '8:00:00 AM',
      endTime: '8:15:00 AM',
      milkQuantity: '4.25',
    }]));

    render(<MilkingHistoryPage />);
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.getByText('4.25')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear History' }));

    expect(await screen.findByText('No milking history available.')).toBeInTheDocument();
    expect(localStorage.getItem('milkingHistory')).toBeNull();
  });

  it('shows a recoverable error when saved JSON is malformed', async () => {
    localStorage.setItem('milkingHistory', '{');

    render(<MilkingHistoryPage />);
    expect(await screen.findByRole('alert')).toHaveTextContent('not valid JSON');
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear saved history' })).toBeInTheDocument();
  });
});
