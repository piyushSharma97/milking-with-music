import { beforeEach, describe, expect, it } from 'vitest';
import type { MilkingSession } from '../types';
import {
  clearMilkingHistory,
  loadMilkingHistory,
  saveMilkingSession,
} from './milkingHistory';

const session: MilkingSession = {
  date: '10/29/2026',
  startTime: '8:00:00 AM',
  endTime: '8:15:00 AM',
  milkQuantity: '4.25',
};

describe('milking history storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns an empty list when no history has been saved', () => {
    expect(loadMilkingHistory()).toEqual([]);
  });

  it('loads valid stored sessions', () => {
    localStorage.setItem('milkingHistory', JSON.stringify([session]));

    expect(loadMilkingHistory()).toEqual([session]);
  });

  it('rejects malformed or unexpected stored data', () => {
    localStorage.setItem('milkingHistory', '{');
    expect(() => loadMilkingHistory()).toThrow('not valid JSON');

    localStorage.setItem('milkingHistory', JSON.stringify([{ date: 'today' }]));
    expect(() => loadMilkingHistory()).toThrow('unexpected format');
  });

  it('appends a saved session without replacing existing entries', () => {
    localStorage.setItem('milkingHistory', JSON.stringify([session]));
    saveMilkingSession({ ...session, milkQuantity: '5' });

    expect(loadMilkingHistory()).toEqual([
      session,
      { ...session, milkQuantity: '5' },
    ]);
  });

  it('clears saved history', () => {
    saveMilkingSession(session);
    clearMilkingHistory();

    expect(localStorage.getItem('milkingHistory')).toBeNull();
    expect(loadMilkingHistory()).toEqual([]);
  });
});
