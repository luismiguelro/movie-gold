import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Trailer.css';
import React, { useState, useEffect } from 'react';
import Loader from '../constants/loader/Loader';

const Trailer = () => {
  const [loading, setLoading] = useState(true);
  const [loaderTimeoutCompleted, setLoaderTimeoutCompleted] = useState(false);

  let params = useParams();
  let key = params.ytTrailerId;

  const handleReady = () => {
    setLoading(false);
  };

  const handleBuffer = () => {
    setLoading(true);
  };

  useEffect(() => {
    const loaderTimeoutId = setTimeout(() => {
      setLoaderTimeoutCompleted(true);
    }, 1000); // Adjust the duration as needed (in milliseconds)

    return () => clearTimeout(loaderTimeoutId);
  }, []); // Run the timeout effect only once

  useEffect(() => {
    if (loaderTimeoutCompleted && key) {
      // If the loader timeout has completed and there is a video key
      const videoTimeoutId = setTimeout(() => {
        setLoading(false);
      }, 2000); // Adjust the duration for the video loading (in milliseconds)

      return () => clearTimeout(videoTimeoutId);
    }
  }, [loaderTimeoutCompleted, key]);

  return (
    <div className="react-player-container">
      {loading && loaderTimeoutCompleted && <Loader />} {/* Show the Loader after initial timeout */}
      {key != null ? (
        <ReactPlayer
          controls={true}
          playing={true}
          url={`https://www.youtube.com/watch?v=${key}`}
          width="100%"
          height="100%"
          onReady={handleReady}
          onBuffer={handleBuffer}
        />
      ) : null}
    </div>
  );
};

export default Trailer;