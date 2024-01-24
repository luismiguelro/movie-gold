import React, { useState, useEffect } from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import Loader from '../constants/loader/Loader';
import { useNavigate } from 'react-router-dom';

const Hero = ({ movies }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [headerTitle, setHeaderTitle] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleLinkClick = (movie) => {
    setHeaderTitle(movie.title);
  };

  const goToReviews = (movieId) => {
    navigate(`/reviews/${movieId}`);
  };

  return (
    <div className='hero-container'>
      {loading && <Loader />}
      {!loading && (
        <Carousel>
          {movies?.map((movie) => (
            <Paper key={movie.imdbId} >
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
                      <div className="movie-review-button-container reviews-button">
                        <Button variant="info" onClick={() => goToReviews(movie.imdbId)} className="reviews-button">
                          Reviews
                        </Button>
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
