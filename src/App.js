import React from 'react';
import axiosInstance from './components/api/axios';
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
import RegisterForm from './components/form/register/Register';
import LoginForm from './components/form/login/Login';
function App() {
  const urlBase = "/api/v1/movies";

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(); // Estado para almacenar la información del usuario

  // Función para establecer el estado del usuario después del inicio de sesión
  const handleLogin = (userData) => {
    setUser(userData); // Establecer la información del usuario en el estado
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setUser(null); // Limpiar la información del usuario al cerrar sesión
  };
  const getMovies = async () => {

    try {
      const response = await axiosInstance.get(urlBase);
      setMovies(response.data);
      console.log(response);
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
      const config = {
        headers: {
            'Authorization': `Bearer ${user}` // Asumiendo que 'user' contiene tu token de autorización
        }
    };
    
      const response = await axiosInstance.get(`${urlBase}/${movieId}`,config);
      
      console.log(response.data);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);
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
  console.log(user);

  return (
    <div className="App">
     <Header user={user} onLogout={handleLogout} />

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />} />
          <Route path='/' element={<WatchList movies={movies} />} />
          <Route path="/trailer/:ytTrailerId" element={<Trailer movies={movies} />}></Route>
          <Route path='/watchlist' element={<WatchList movies={movies} />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm setUser={setUser} />} />
          <Route path="/reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} user={user} />}></Route>
        </Route>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
