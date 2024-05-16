import  { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import {formatTime} from '../CommonFunctions'
const Timer = ({milking,setDuration}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (milking) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [milking]);
   useEffect(()=>{
    if(!milking){
        setSeconds(0) 
        setDuration(seconds) 
        console.log('second',seconds)
    }else if(milking){
        setDuration(0)
    }
   },[milking])
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