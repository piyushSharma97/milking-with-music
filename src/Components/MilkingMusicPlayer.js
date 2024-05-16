import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { tracks } from '../data/tracks';
import Timer from './Timer';
import MilkModal from './MilkModal';
const MilkingMusicPlayer = () => {
    const [milking, setMilking] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [paused, setPaused] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [audio] = useState(new Audio());
    const [showMilkModal, setShowMilkModal] = useState(false);
    const [milkQuantity, setMilkQuantity] = useState('');
    const [playbackPosition, setPlaybackPosition] = useState(0);
    useEffect(() => {
        const playAudio = () => {
            if (tracks[currentTrackIndex] && tracks[currentTrackIndex].src) {
                audio.src = tracks[currentTrackIndex].src;
                audio.loop = true;
                audio.currentTime = playbackPosition;
                audio.play();
                setStartTime(new Date());
            }
        };
        const stopAudio = () => {
            audio.loop = false;
            audio.pause();
            audio.currentTime = 0;

        };
        const pauseAudio = () => {
            audio.pause();
        }
        if (milking && !paused) {
            playAudio();
        } if (milking && paused) {
            pauseAudio()
        } else if (!milking) {
            stopAudio();
        }

        return () => {
            stopAudio();
        };
    }, [milking, paused]);
    const pauseMilking = () => {
        setPaused(true);
        setPlaybackPosition(audio.currentTime);
        audio.pause();
    };

    const resumeMilking = () => {
        setPaused(false);
    };
    const startMilking = (e) => {
        e.preventDefault();
        setMilking(true);

        setShowMilkModal(false)
        // Start music playback and timer
    };
    const stopMilking = (e) => {
        e.preventDefault();
        setMilking(false);
        setShowMilkModal(true)
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
        } else {
            setMilking(true);
            setShowMilkModal(false)
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
                        {paused ? (
                            <button className="milking-button pause-milking" onClick={resumeMilking}>Resume</button>
                        ) : <button className="milking-button resume-milking" onClick={pauseMilking}>Pause</button>}
                        <button className="milking-button stop-milking" onClick={stopMilking}>Stop</button>

                    </div>
                ) : (
                    <button className="milking-button start-milking" onClick={startMilking}>Start</button>
                )}

            </div>
            <div>
                <Timer
                    milking={milking}
                    paused={paused}
                />
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
                <ListGroup className='trackList'>
                    {tracks.map((track, index) => (
                        <ListGroup.Item key={index} onClick={() => setTrack(index)} className={`musicTrack ${index === currentTrackIndex ? 'active' : ''}`}>
                            <img src={track.thumbnail} alt={track.title} />
                            <span className="trackTitle">{track.title}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    );

}

export default MilkingMusicPlayer;