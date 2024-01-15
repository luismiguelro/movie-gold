import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/Trailer/Trailer'
import Reviews from './components/reviews/Reviews';
function App() {

  const urlBase = "http://localhost:8080/api/v1/movies"
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {

    try {

      const response = await axios.get(urlBase);

      setMovies(response.data);

    }
    catch (err) {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {

    try {
      const response = await axios.get(`${urlBase}/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviews);


    }
    catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />} />
          <Route path="/trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route path="/reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}></Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
