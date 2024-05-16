import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { tracks } from '../data/tracks';
import Timer from './Timer';
import { formatTime } from '../CommonFunctions';
import MilkModal from './MilkModal';
const MilkingMusicPlayer = () => {
    const [milking, setMilking] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [paused, setPaused] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [audio] = useState(new Audio());
    const [endTime, setEndTime] = useState(null);
    const [showMilkModal, setShowMilkModal] = useState(false);
    const [duration, setDuration] = useState(null)
    const [milkQuantity, setMilkQuantity] = useState('');
    useEffect(() => {
        const playAudio = () => {
            if (tracks[currentTrackIndex] && tracks[currentTrackIndex].src) {
                audio.src = tracks[currentTrackIndex].src;
                audio.loop = true;
                audio.play();
                setStartTime(new Date());
                console.log('audio',audio)
            }
            setShowMilkModal(false)
        };
        const stopAudio = () => {
            audio.loop = false;
            audio.pause();
            audio.currentTime = 0;
            setEndTime(new Date());
            console.log('endTime?.getTime() ',endTime?.getTime() )
            setShowMilkModal(true)
        };
        const pauseAudio=()=>{
            audio.pause();
        }
        if (milking && !paused) {
            playAudio();
        } if(milking && paused){
             pauseAudio()
        }else if(!milking) {
            stopAudio();
        }

        return () => {
            stopAudio();
        };
    }, [milking]);
    const pauseMilking = () => {
        setPaused(true);
    };

    const resumeMilking = () => {
        setPaused(false);
    };
    useEffect(()=>{
     if(startTime&&endTime){
        setDuration((endTime?.getTime() - startTime?.getTime())/1000);
     }
    },[startTime,endTime])
    const startMilking = (e) => {
        e.preventDefault();
        setMilking(true);
        setDuration(0)
        // Start music playback and timer
    };
    const stopMilking = (e) => {
        e.preventDefault();
        setMilking(false);
      
        // Stop music and timer
        // Prompt user to enter milking details
    };
    const handleMilkConfirmation = () => {
        // Save milking session details
        const endTime = new Date();
        const duration = endTime - startTime; // Calculate milking duration
        const sessionData = {
            date: startTime.toLocaleDateString(),
            startTime: startTime.toLocaleTimeString(),
            endTime: endTime.toLocaleTimeString(),
            duration: formatTime(duration / 1000), // Convert milliseconds to seconds for the timer
            milkQuantity: milkQuantity,
        };
        saveMilkingSession(sessionData);
        
        // Reset states
        setMilking(false);
        setPaused(false);
        setStartTime(null);
        setMilkQuantity('');
        setShowMilkModal(false);
    };
    const saveMilkingSession = (sessionData) => {
        let milkingHistory = localStorage.getItem('milkingHistory') ? JSON.parse(localStorage.getItem('milkingHistory')) : [];
        milkingHistory.push(sessionData);
        localStorage.setItem('milkingHistory', JSON.stringify(milkingHistory));
    };
    const setTrack = (index) => {
        setCurrentTrackIndex(index);
        audio.src = tracks[index].src;
        if (milking) {
            audio.play();
        }
    };
    const handleCloseMilkModal = () => {
        setShowMilkModal(false);
    };
    return (
        <div className="main-container text-center">

            <div>
                <h2 className="heading mb-4">Milking Music Player</h2>
                {milking ? (
                    <div className="milking-container">
                       {paused?(
                        <button className="milking-button stop-milking" onClick={resumeMilking}>Resume</button>
                       ):<button className="milking-button stop-milking" onClick={pauseMilking}>Pause</button>} 
                        <button className="milking-button stop-milking" onClick={stopMilking}>Stop</button>
                        
                    </div>
                ) : (
                    <button className="milking-button start-milking" onClick={startMilking}>Start Milking</button>
                )}

            </div>
            <div>
                <Timer milking={milking} setDuration={setDuration} />
            </div>
            <MilkModal 
            showMilkModal={showMilkModal}  
            handleCloseMilkModal={handleCloseMilkModal} 
            milkQuantity={milkQuantity}
            setMilkQuantity={setMilkQuantity}
            handleMilkConfirmation={handleMilkConfirmation}
            />
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