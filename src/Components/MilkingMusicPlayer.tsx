import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { tracks } from '../data/tracks';
import type { MilkingSession } from '../types';
import { saveMilkingSession as persistMilkingSession } from '../utils/milkingHistory';
import MilkModal from './MilkModal';
import Timer from './Timer';

type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

/** Coordinates playback, the session timer, milk entry, and saved history. */
const MilkingMusicPlayer = (): JSX.Element => {
  const [milking, setMilking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [showMilkModal, setShowMilkModal] = useState(false);
  const [milkQuantity, setMilkQuantity] = useState('');
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    /** Reports a browser-level failure to load or decode the selected track. */
    const handleAudioError = (): void => {
      setPlaybackState('error');
      setPlaybackError('Unable to load this track. Choose another track or try again.');
    };

    /** Keeps playback status synchronized when the browser buffers the track. */
    const handleAudioWaiting = (): void => setPlaybackState('loading');

    /** Clears the loading state once the browser begins producing audio. */
    const handleAudioPlaying = (): void => setPlaybackState('playing');

    audio.addEventListener('error', handleAudioError);
    audio.addEventListener('waiting', handleAudioWaiting);
    audio.addEventListener('playing', handleAudioPlaying);

    return () => {
      audio.removeEventListener('error', handleAudioError);
      audio.removeEventListener('waiting', handleAudioWaiting);
      audio.removeEventListener('playing', handleAudioPlaying);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    let isEffectActive = true;

    if (!milking) {
      audio.pause();
      audio.currentTime = 0;
      setPlaybackState('idle');
      return () => {
        isEffectActive = false;
      };
    }

    if (paused) {
      audio.pause();
      setPlaybackState('paused');
      return () => {
        isEffectActive = false;
      };
    }

    const track = tracks[currentTrackIndex];
    if (!track) {
      setPlaybackState('error');
      setPlaybackError('The selected track could not be found.');
      return () => {
        isEffectActive = false;
      };
    }

    setPlaybackError(null);
    setPlaybackState('loading');
    audio.src = track.src;
    audio.currentTime = playbackPosition;

    /** Presents rejected playback requests instead of leaving them unhandled. */
    const handlePlaybackFailure = (): void => {
      if (!isEffectActive) {
        return;
      }
      setPlaybackState('error');
      setPlaybackError('Unable to play this track. Check your audio settings or choose another track.');
    };

    try {
      void audio.play().then(
        () => {
          if (isEffectActive) {
            setPlaybackState('playing');
          }
        },
        handlePlaybackFailure
      );
    } catch {
      handlePlaybackFailure();
    }

    return () => {
      isEffectActive = false;
    };
  }, [milking, paused, currentTrackIndex, playbackPosition]);

  /** Begins a milking session and records its start time. */
  const startMilking = (): void => {
    setMilking(true);
    setStartTime(new Date());
    setPaused(false);
    setStorageError(null);
  };

  /** Pauses the timer and audio while preserving the audio's current position. */
  const pauseMilking = (): void => {
    setPaused(true);
    setPlaybackPosition(audioRef.current?.currentTime ?? 0);
    audioRef.current?.pause();
  };

  /** Resumes the current session and selected track. */
  const resumeMilking = (): void => {
    setPaused(false);
  };

  /** Ends playback and opens the quantity-entry dialog. */
  const stopMilking = (): void => {
    setMilking(false);
    audioRef.current?.pause();
    setPlaybackPosition(0);
    setShowMilkModal(true);
  };

  /** Selects a playlist entry and starts it from the beginning if active. */
  const setTrack = (index: number): void => {
    setCurrentTrackIndex(index);
    setPlaybackPosition(0);
  };

  /** Saves the completed session and resets its form state on success. */
  const handleMilkConfirmation = (): void => {
    if (!startTime) {
      setStorageError('The session start time is unavailable. Start a new session before saving.');
      return;
    }

    const endTime = new Date();
    const sessionData: MilkingSession = {
      date: startTime.toLocaleDateString(),
      startTime: startTime.toLocaleTimeString(),
      endTime: endTime.toLocaleTimeString(),
      milkQuantity,
    };

    try {
      persistMilkingSession(sessionData);
    } catch (saveError) {
      setStorageError(saveError instanceof Error ? saveError.message : 'Unable to save the milking session.');
      return;
    }

    setStorageError(null);
    setMilking(false);
    setPaused(false);
    setStartTime(null);
    setMilkQuantity('');
    setShowMilkModal(false);
  };

  /** Closes the quantity dialog and abandons the current unsaved session. */
  const handleCloseMilkModal = (): void => {
    setShowMilkModal(false);
    setMilking(false);
    setPaused(false);
    setStartTime(null);
    setMilkQuantity('');
    setStorageError(null);
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Row className="text-center mb-4">
        <Col><h2 className="heading">Milking Music Player</h2></Col>
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
        <Col><Timer milking={milking} paused={paused} /></Col>
      </Row>
      {playbackState === 'loading' && (
        <p className="mt-3" role="status" aria-live="polite">Loading music...</p>
      )}
      {playbackError && <Alert className="mt-3" variant="danger" role="alert">{playbackError}</Alert>}
      {storageError && !showMilkModal && (
        <Alert className="mt-3" variant="danger" role="alert">{storageError}</Alert>
      )}
      <MilkModal
        showMilkModal={showMilkModal}
        handleCloseMilkModal={handleCloseMilkModal}
        milkQuantity={milkQuantity}
        setMilkQuantity={setMilkQuantity}
        handleMilkConfirmation={handleMilkConfirmation}
        submissionError={showMilkModal ? storageError : null}
      />
      <Row className="text-center mt-4">
        <Col>
          <h2 className="heading mb-4">Playlist</h2>
          <ListGroup>
            {tracks.map((track, index) => (
              <ListGroup.Item
                action
                as="button"
                type="button"
                key={track.src}
                onClick={() => setTrack(index)}
                className={`musicTrack ${index === currentTrackIndex ? 'active' : ''}`}
                aria-current={index === currentTrackIndex ? 'true' : undefined}
              >
                <img src={track.thumbnail} alt={track.title} />
                <span className="trackTitle">{track.title}</span>
                <span className="m-5">{index === currentTrackIndex ? 'Playing...' : ''}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MilkingMusicPlayer;
