import React, { useState, useEffect } from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Loader from '../constants/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Hero = ({ movies }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading delay
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulating a 5-second loading delay

    return () => clearTimeout(timeoutId);
  }, []);

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  return (
    <div className='hero-container'>
      {loading && <Loader />} {/* Show the loader while loading */}
      {!loading && (
        <div className='movie-carousel-container'>
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
                      <div className='movie-buttons-container'>
                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                          <div className='play-button-icon-container'>
                            <FontAwesomeIcon className='play-button-icon' icon={faCirclePlay} />
                          </div>
                        </Link>
                        <div className="movie-review-button-container">
                          <Button variant="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default Hero;
