import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { tracks } from '../data/tracks';
import Timer from './Timer';
const MilkingMusicPlayer = () => {
    const [milking, setMilking] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const startMilking = () => {
        setMilking(true);
        setStartTime(new Date());
        // Start music playback and timer
        // This function will be implemented later
    };
    const stopMilking = () => {
        setMilking(false);
        setEndTime(new Date());
        const milkingData = {
            date: new Date().toLocaleDateString(),
            startTime: startTime.toLocaleTimeString(),
            endTime: endTime.toLocaleTimeString(),
            totalMilk: 'TODO: Calculate milk yield',
        };
        saveMilkingSession(milkingData);
        // Stop music and timer
        // Prompt user to enter milking details
        // This function will be implemented later
    };
    const saveMilkingSession = (sessionData) => {
        let milkingHistory = JSON.parse(localStorage.getItem('milkingHistory')) || [];
        milkingHistory.push(sessionData);
        localStorage.setItem('milkingHistory', JSON.stringify(milkingHistory));
    };
    const setTrack = (selectedAudio) => {
        console.log('selectedAudio', selectedAudio)
    }
    return (
        <div className="main-container text-center">
            <div>
                <h2 className="heading mb-4">Playlist</h2>
                <ListGroup>
                    {tracks.map((track, index) => (
                        <ListGroup.Item key={index}>
                            <a
                                className={`musicTrack`}
                                onClick={() => setTrack(track)}>{` ${track.title}`}</a>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

            </div>
            <div>
                <h2 className="heading mb-4">Milking Music Player</h2>
                {milking ? (
                    <div className="milking-container">
                        <Timer />
                        <button className="btn btn-danger"  onClick={stopMilking}>Stop</button>
                    </div>
                ) : (
                    <button className="btn btn-success" onClick={startMilking}>Start Milking</button>
                )}
                <Link className="btn btn-info mt-3" to="/milking-history">Milking History</Link>
            </div>


        </div>
    );

}

export default MilkingMusicPlayer;