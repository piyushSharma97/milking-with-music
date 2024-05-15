import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { tracks } from '../data/tracks';

const MilkingMusicPlayer = () => {

    console.log('selectedAudio')

    const setTrack = (selectedAudio) => {
        console.log('selectedAudio', selectedAudio)
    }
    return (
        <div>
            <div>
                <h2>Playlist</h2>
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
                <h2>Milking Music Player</h2>
                
            </div>


        </div>
    );

}

export default MilkingMusicPlayer;