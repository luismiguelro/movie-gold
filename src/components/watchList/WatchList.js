import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faVideo } from '@fortawesome/free-solid-svg-icons';

import './WatchList.css'; // Importa tu archivo de estilo CSS

function WatchList({ movies }) {
  
  const handleLinkClick = (movie) => {
    // Set the header title and update the document title
    setHeaderTitle(movie.title);
    document.title = `${movie.title} - Movies API`;
  };
  return (
    <div className="card-container d-flex flex-wrap justify-content-start">
      {movies?.map((movie, index) => (
        <Card key={index} style={{ width: '18rem', margin: '10px' }} className="hover-card">
          <div className="image-container">
            <Card.Img variant="top" src={movie.poster} alt={`Card ${index + 1}`} />
            <div className='movie-buttons-container'>
              <Link to={`/trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`} className="hover-link" style={{ textDecoration: "none" }}>
                <div className='play-button-icon-container'>
                  <FontAwesomeIcon className='play-button-icon' icon={faCirclePlay} />
                  <span style={{ color: "white", textDecoration: "none" }}
                  onClick={() => handleLinkClick(movie)}
                  >Watch Trailer</span>
                </div>
              </Link>
              <Link to={movie.movieLink} target='_blank' className="hover-link" style={{ textDecoration: "none" }}>
                <div className='play-button-icon-container'>
                  <FontAwesomeIcon className='play-button-icon' icon={faVideo} />
                  <span style={{ color: "white", textDecoration: "none" }}>Watch Movie</span>
                </div>
              </Link>
            </div>
          </div>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{new Date(movie.releaseDate).getFullYear()}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default WatchList;
