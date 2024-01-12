import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/Trailer/Trailer'

function App() {

  const urlBase = "http://localhost:8080/api/v1/movies"
  const [movies, setMovies] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(urlBase);
      setMovies(response.data);


    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />} />
          <Route path="/trailer/:ytTrailerId" element={<Trailer />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
