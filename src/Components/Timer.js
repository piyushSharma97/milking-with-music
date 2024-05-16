import { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { formatTime } from '../CommonFunctions'
const Timer = ({ milking, paused }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (milking&&!paused) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if(milking&&paused){
      setSeconds(prevSeconds => prevSeconds);
    }else {
      setSeconds(0)
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [milking,paused]);

  const getFormatedTime = formatTime(seconds)

  return (
    <Card className="text-center">
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>{getFormatedTime}</h2>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Timer;