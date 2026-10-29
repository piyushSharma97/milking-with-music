import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { formatTime } from '../utils/CommonFunctions';

interface TimerProps {
  milking: boolean;
  paused: boolean;
}

/** Displays elapsed milking time, pausing and resetting with the session. */
const Timer = ({ milking, paused }: TimerProps): JSX.Element => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (milking && !paused) {
      /** Advances the displayed duration by one second. */
      const tick = (): void => setSeconds((previousSeconds) => previousSeconds + 1);
      intervalId = setInterval(() => {
        tick();
      }, 1000);
    } else if (!milking) {
      setSeconds(0);
    }

    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [milking, paused]);

  const formattedTime = formatTime(seconds);

  return (
    <Card className="text-center">
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>{formattedTime}</h2>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Timer;
