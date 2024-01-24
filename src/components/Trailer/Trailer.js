import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Trailer.css';
import React, { useState, useEffect } from 'react';
import Loader from '../constants/loader/Loader';

const Trailer = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const key = params.ytTrailerId;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000); // Tiempo de espera para el loader inicial (en milisegundos)

    if (key) {
      const videoTimeoutId = setTimeout(() => {
        setLoading(false);
      }, 2000); // Tiempo de espera para el video (en milisegundos)

      return () => clearTimeout(videoTimeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [key]); // Si el valor de key cambia, reinicia el timeout

  const handleBuffer = () => {
    setLoading(true);
  };

  return (
    <div className="react-player-container">
      {loading && <Loader />} {/* Muestra el loader durante la espera */}
      {key != null ? (
        <ReactPlayer
          controls={true}
          playing={true}
          url={`https://www.youtube.com/watch?v=${key}`}
          width="100%"
          height="100%"
          onBuffer={handleBuffer}
        />
      ) : null}
    </div>
  );
};

export default Trailer;
