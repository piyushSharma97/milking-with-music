import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { tracks } from '../data/tracks';
import Timer from './Timer';
import MilkModal from './MilkModal';

const MilkingMusicPlayer = () => {
    // State variables
    const [milking, setMilking] = useState(false); // To track if milking is in progress
    const [paused, setPaused] = useState(false); // To track if milking is paused
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Current track index
    const [audio] = useState(new Audio()); // Audio element for music playback
    const [startTime, setStartTime] = useState(null); // Start time of milking
    const [playbackPosition, setPlaybackPosition] = useState(0); // To track the paused position of the audio
    const [showMilkModal, setShowMilkModal] = useState(false); // To control the visibility of the milk quantity modal
    const [milkQuantity, setMilkQuantity] = useState(''); // To store the entered milk quantity

    useEffect(() => {
        if (milking && !paused) {
            // If milking is in progress and not paused, play the audio
            const playAudio = () => {
                const track = tracks[currentTrackIndex];
                if (track && track.src) {
                    audio.src = track.src;
                    audio.currentTime = playbackPosition; // Resume from where it was paused
                    audio.play();
                    setStartTime(new Date());
                }
            };
            playAudio();
        } else if (!milking) {
            // If milking is stopped, pause and reset the audio
            audio.pause();
            audio.currentTime = 0;
        }
    }, [milking, paused, currentTrackIndex,audio,playbackPosition]);

    const startMilking = () => {
        // Start milking session
        setMilking(true);
        setStartTime(new Date());
        setPaused(false);
    };

    const pauseMilking = () => {
        // Pause milking session
        setPaused(true);
        setPlaybackPosition(audio.currentTime); // Save the current playback position
        audio.pause();
    };

    const resumeMilking = () => {
        // Resume milking session
        setPaused(false);
    };

    const stopMilking = () => {
        // Stop milking session
        setMilking(false);
        audio.pause();
        setPlaybackPosition(0);
        setShowMilkModal(true); // Show modal to enter milk quantity
    };

    const setTrack = (index) => {
        // Change the track and handle milking state
        setCurrentTrackIndex(index);
        setPlaybackPosition(0);
    };

    const handleMilkConfirmation = () => {
        // Handle milk quantity confirmation
        const endTime = new Date();
      
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
        // Save the milking session details to localStorage
        let milkingHistory = localStorage.getItem('milkingHistory') ? JSON.parse(localStorage.getItem('milkingHistory')) : [];
        milkingHistory.push(sessionData);
        localStorage.setItem('milkingHistory', JSON.stringify(milkingHistory));
    };

    const handleCloseMilkModal = () => {
        // Close the milk quantity modal
        setShowMilkModal(false);
         // Reset states
         setMilking(false);
         setPaused(false);
         setStartTime(null);
         setMilkQuantity('');
         setShowMilkModal(false);
    };

    return (
        <Container fluid className="d-flex flex-column align-items-center justify-content-center vh-100">
            <Row className="text-center mb-4">
                <Col>
                    <h2 className="heading">Milking Music Player</h2>
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    {milking ? (
                        <div className="milking-container d-flex justify-content-center">
                            <Button variant="primary" className="mx-2" onClick={paused ? resumeMilking : pauseMilking}>
                                {paused ? 'Resume' : 'Pause'}
                            </Button>
                            <Button variant="danger" className="mx-2" onClick={stopMilking}>Stop</Button>
                        </div>
                    ) : (
                        <Button variant="success" className="start-milking" onClick={startMilking}>Start Milking</Button>
                    )}
                </Col>
            </Row>
            <Row className="text-center mt-4">
                <Col>
                    <Timer milking={milking} paused={paused} />
                </Col>
            </Row>
            <MilkModal
                showMilkModal={showMilkModal}
                handleCloseMilkModal={handleCloseMilkModal}
                milkQuantity={milkQuantity}
                setMilkQuantity={setMilkQuantity}
                handleMilkConfirmation={handleMilkConfirmation}
            />
            <Row className="text-center mt-4">
                <Col>
                    <h2 className="heading mb-4">Playlist</h2>
                    <ListGroup>
                        {tracks.map((track, index) => (
                             <ListGroup.Item key={index} onClick={() => setTrack(index)} className={`musicTrack ${index === currentTrackIndex ? 'active' : ''}`}>
                             <img src={track.thumbnail} alt={track.title} />
                             <span className="trackTitle">{track.title}</span>
                             <span className='m-5'>{`${index === currentTrackIndex ? 'Playing...' : ''}`}</span>
                         </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default MilkingMusicPlayer;
