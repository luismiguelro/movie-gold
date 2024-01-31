import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/Trailer/Trailer'
import Reviews from './components/reviews/Reviews';
import WatchList from './components/watchList/WatchList';
import Swal from 'sweetalert2'
import Footer from './components/constants/footer/Footer';
function App() {

  const urlBase = "https://api-movies.fly.dev/api/v1/movies"
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const getMovies = async () => {

    try {
      const response = await axios.get(urlBase);
      setMovies(response.data);
    }
    catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err,
      });
    }
  }

  const getMovieData = async (movieId) => {

    try {
      const response = await axios.get(`${urlBase}/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);
      console.log(singleMovie.reviewIds);
    }
    catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
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
          <Route path='/' element={<WatchList movies={movies} />} />
          <Route path="/trailer/:ytTrailerId" element={<Trailer movies={movies} />}></Route>
          <Route path="/reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}></Route>
          <Route path='/watchlist' element={<WatchList movies={movies} />} />
        </Route>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
