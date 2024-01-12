import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Trailer.css';
import React, { useState, useEffect } from 'react';

const Trailer = () => {
  const [loading, setLoading] = useState(true);

  let params = useParams();
  let key = params.ytTrailerId;

  const handleReady = () => {
    setLoading(false);
  };

  const handleBuffer = () => {
    setLoading(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [key]); 

  return (
    <div style={{height: '90vh'}}>
      {loading && <div className="loader">Loading...</div>}
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
