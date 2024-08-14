import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ src }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            console.log('AudioPlayer source:', src);
            audioRef.current.load();
        }
    }, [src]);

    return (
        <div>
            <audio ref={audioRef} controls>
                <source src={src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayer;

