import { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleCarousel from './Carousel ';

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
            <h2>Welcome to the Milking Tracker with Music</h2>
            <SimpleCarousel />
            <p>Studies show that playing soothing music has a positive impact on cattle, reducing stress and potentially increasing milk production. Slow music, in particular, has been linked to a 3% improvement in daily milk yield in cows. This calming effect also helps drown out stress-inducing noises in farming environments.</p>
        </div>
    );
};

export default MainPage;