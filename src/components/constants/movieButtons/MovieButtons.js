// MovieButtons.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faVideo } from '@fortawesome/free-solid-svg-icons';

import './MovieButtons.css'; // Importa tu archivo de estilo CSS

function MovieButtons({ trailerLink, movieLink }) {
  return (
    <div>
      <Link to={`trailer/${trailerLink.substring(trailerLink.length - 11)}`} className="text-button">
        <div className='play-button-icon-container'>
          <FontAwesomeIcon className='play-button-icon' icon={faCirclePlay} />
          <span style={{ color: "gold" }}>Watch Trailer</span>
        </div>
      </Link>
      <Link to={movieLink} target='_blank' className="text-button">
        <div className='play-button-icon-container'>
          <FontAwesomeIcon className='play-button-icon' icon={faVideo} />
          <span style={{ color: "gold" }}>Watch Movie</span>
        </div>
      </Link>
    </div>
  );
}

export default MovieButtons;
