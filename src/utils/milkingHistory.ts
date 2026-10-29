import type { MilkingSession } from '../types';

const STORAGE_KEY = 'milkingHistory';

/** Checks that a stored value follows the existing milking-session schema. */
function isMilkingSession(value: unknown): value is MilkingSession {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const session = value as Record<string, unknown>;
  return (
    typeof session.date === 'string' &&
    typeof session.startTime === 'string' &&
    typeof session.endTime === 'string' &&
    typeof session.milkQuantity === 'string'
  );
}

/** Reads and validates saved sessions, surfacing corrupt or inaccessible storage. */
export function loadMilkingHistory(): MilkingSession[] {
  let storedHistory: string | null;
  try {
    storedHistory = localStorage.getItem(STORAGE_KEY);
  } catch {
    throw new Error('Unable to access milking history in this browser.');
  }

  if (storedHistory === null) {
    return [];
  }

  let parsedHistory: unknown;
  try {
    parsedHistory = JSON.parse(storedHistory);
  } catch {
    throw new Error('Saved milking history is not valid JSON.');
  }

  if (!Array.isArray(parsedHistory) || !parsedHistory.every(isMilkingSession)) {
    throw new Error('Saved milking history has an unexpected format.');
  }

  return parsedHistory;
}

/** Saves one session while preserving the original localStorage format. */
export function saveMilkingSession(session: MilkingSession): void {
  const history = loadMilkingHistory();
  history.push(session);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    throw new Error('Unable to save milking history in this browser.');
  }
}

/** Removes the saved session history from localStorage. */
export function clearMilkingHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    throw new Error('Unable to clear milking history in this browser.');
  }
}
