// Hero.js
import React, { useState, useEffect } from 'react';
import './Hero.css'
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faFilm, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import Loader from '../constants/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Hero = ({ movies }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [headerTitle, setHeaderTitle] = useState(''); // Declare headerTitle state here

  useEffect(() => {
    // Simulating a loading delay
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulating a 5-second loading delay

    return () => clearTimeout(timeoutId);
  }, []);

  const handleLinkClick = (movie) => {
    // Set the header title and update the document title
    setHeaderTitle(movie.title);
  };

  function reviews(movieId) {
    navigate(`/reviews/${movieId}`);
  }

  return (
    <div className='hero-container'>
      {loading && <Loader />} {/* Show the loader while loading */}
      {!loading && (
        <Carousel>
          {movies?.map((movie) => (
            <Paper key={movie.imdbId}>
              <div className='movie-card-container'>
                <div className="movie-card" style={{ "--img": `url(${movie.backdrops[0]})` }}>
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt="" />
                    </div>
                    <div className='movie-title'>
                      <h4>{movie.title}</h4>
                    </div>
                    <div className='movie-buttons'>
                      <Link
                        to={`trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}
                        style={{ textDecoration: "none" }}
                        onClick={() => handleLinkClick(movie)}
                      >
                        <div className='play-button-icon-container'>
                          <FontAwesomeIcon className='play-button-icon' icon={faCirclePlay} />
                          <span style={{ color: "white", textDecoration: "none" }}>Watch Trailer</span>
                        </div>
                      </Link>
                      <Link to={movie.movieLink} target='_blank' style={{ textDecoration: "none" }}>
                        <div className='play-button-icon-container'>
                          <FontAwesomeIcon className='play-button-icon' icon={faVideo} />
                          <span style={{ color: "white", textDecoration: "none" }}>Watch Movie</span>
                        </div>
                      </Link>

                      <div className="movie-review-button-container">
                        <Button variant="info" onClick={() => reviews(movie.imdbId)}>Reviews</Button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </Paper>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Hero;
