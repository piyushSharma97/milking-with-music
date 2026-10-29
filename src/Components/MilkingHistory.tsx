import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import type { MilkingSession } from '../types';
import { clearMilkingHistory, loadMilkingHistory } from '../utils/milkingHistory';

/** Loads and displays saved milking sessions, with recoverable storage states. */
const MilkingHistoryPage = (): JSX.Element => {
  const [milkingHistory, setMilkingHistory] = useState<MilkingSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** Loads the saved sessions and reports storage or data-format failures. */
  const loadHistory = useCallback((): void => {
    setIsLoading(true);
    setError(null);
    try {
      setMilkingHistory(loadMilkingHistory());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load milking history.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  /** Clears saved history and keeps the visible state consistent with storage. */
  const clearHistory = (): void => {
    setError(null);
    try {
      clearMilkingHistory();
      setMilkingHistory([]);
    } catch (clearError) {
      setError(clearError instanceof Error ? clearError.message : 'Unable to clear milking history.');
    }
  };

  return (
    <main className="container mt-5">
      <h1 className="text-center mb-4">Milking History</h1>
      {isLoading ? (
        <div className="text-center" role="status">
          <Spinner animation="border" aria-label="Loading milking history" />
          <span className="visually-hidden">Loading milking history...</span>
        </div>
      ) : error ? (
        <Alert variant="danger" role="alert">
          <p>{error}</p>
          <Button variant="outline-danger" onClick={loadHistory}>Try again</Button>
          <Button className="ms-2" variant="outline-secondary" onClick={clearHistory}>
            Clear saved history
          </Button>
        </Alert>
      ) : milkingHistory.length ? (
        <div className="table-responsive">
          <div className="text-center mb-3">
            <Button variant="danger" onClick={clearHistory}>Clear History</Button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Total Milk Quantity</th>
              </tr>
            </thead>
            <tbody>
              {milkingHistory.map((session, index) => (
                <tr key={`${session.date}-${session.startTime}-${index}`}>
                  <td>{session.date}</td>
                  <td>{session.startTime}</td>
                  <td>{session.endTime}</td>
                  <td>{session.milkQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Alert variant="info" role="status">No milking history available.</Alert>
      )}
    </main>
  );
};

export default MilkingHistoryPage;
