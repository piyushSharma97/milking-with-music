import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { tracks } from '../data/tracks';
import Timer from './Timer';
import MilkModal from './MilkModal';
const MilkingMusicPlayer = () => {
    // state variables
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
        // setMilking(false);
        setPaused(true)
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
            milkQuantity: `${milkQuantity} L`,
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
        setMilkQuantity('');
        setMilking(false);
        setPaused(false);
        setStartTime(null);
        
        
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
                <Timer
                    milking={milking}
                    paused={paused}
                />
                </Col>
            </Row>
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
                            <span>{`${index === currentTrackIndex ? 'Playing...' : ''}`}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </Container>
    );

}

export default MilkingMusicPlayer;