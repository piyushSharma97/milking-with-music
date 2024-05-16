import  { useState,useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { tracks } from '../data/tracks';
import Timer from './Timer';
import {formatTime} from '../CommonFunctions'
const MilkingMusicPlayer = () => {
    const [milking, setMilking] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [audio] = useState(new Audio());
    const [endTime, setEndTime] = useState(null);
    const [duration,setDuration] = useState(null)
    useEffect(() => {
        const playAudio = () => {
            if (tracks[currentTrackIndex] && tracks[currentTrackIndex].src) {
                audio.src = tracks[currentTrackIndex].src;
                audio.loop = true;
                audio.play();
                setStartTime(new Date());
            }
        };

        const stopAudio = () => {
            audio.loop = false;
            audio.pause();
            audio.currentTime = 0;
            setEndTime(new Date());
            setDuration(endTime - startTime);
        };

        if (milking) {
            playAudio();
        } else {
            stopAudio();
        }

        return () => {
            stopAudio();
        };
    }, [milking]);
    const startMilking = () => {
        setMilking(true);
        // Start music playback and timer
    };
    const stopMilking = () => {
        setMilking(false);
        // setEndTime(new Date());
        // audio.pause();
        // const milkingData = {
        //     date: new Date().toLocaleDateString(),
        //     startTime: startTime.toLocaleTimeString(),
        //     endTime: endTime.toLocaleTimeString(),
        //     totalMilk: 'TODO: Calculate milk yield',
        // };
        // saveMilkingSession(milkingData);
        // Stop music and timer
        // Prompt user to enter milking details
        // This function will be implemented later
    };
    const saveMilkingSession = (sessionData) => {
        // let milkingHistory = JSON.parse(localStorage.getItem('milkingHistory')) || [];
        // milkingHistory.push(sessionData);
        // localStorage.setItem('milkingHistory', JSON.stringify(milkingHistory));
    };
    const setTrack = (index) => {
        setCurrentTrackIndex(index);
        audio.src = tracks[index].src;
        if (milking) {
            audio.play();
        }
    };
    console.log('milking sdsd',milking)
    return (
        <div className="main-container text-center">

            <div>
                <h2 className="heading mb-4">Milking Music Player</h2>
                {milking ? (
                    <div className="milking-container">
                        <button className="milking-button stop-milking" onClick={stopMilking}>Stop</button>
                    </div>
                ) : (
                    <button className="milking-button start-milking" onClick={startMilking}>Start Milking</button>
                )}

            </div>
            <div>
                 <audio controls autoPlay>
          <source src={currentTrack} type="audio/mpeg" />
   s
        </audio>
            </div>
            <div>
                <Timer milking={milking} setDuration={setDuration}/>
            </div>
            <div>
                <h2 className="heading mb-4">Playlist</h2>
                <ListGroup>
                {tracks.map((track, index) => (
                        <ListGroup.Item key={index} onClick={() => setTrack(index)}>
                            <a className={`musicTrack ${index === currentTrackIndex ? 'active' : ''}`}>
                                {track.title}
                            </a>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

            </div>
        </div>
    );

}

export default MilkingMusicPlayer;