import  { useState } from 'react';
import { Link } from 'react-router-dom';


const MainPage = () => {
    const [isMilking, setIsMilking] = useState(false);
  
    const handleStartMilking = () => {
      // Start milking process
      setIsMilking(true);
      // Start music playback
      // Start timer
    };
  
    return (
      <div>
        <h1>Main Page</h1>
        <button onClick={handleStartMilking}>{isMilking ? "Milking..." : "Start Milking"}</button>
        <Link to="/milking-history">Milking History</Link>
      </div>
    );
  };
  
  export default MainPage;