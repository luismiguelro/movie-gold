import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router';
import Home from './components/home/Home';
function App() {

  const urlBase = "http://localhost:8080/api/v1/movies"
  const [movies, setMovies] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(urlBase);
      const datos = response.data;
      console.log(datos);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
