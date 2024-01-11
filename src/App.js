import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig'
import { useEffect, useState } from 'react';

function App() {
  const [movies, setMovies] = useState();

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data)
    } catch (error) {
      alert("Error al consumir datos",error.message)
    }
  }

  useEffect(()=>{
    getMovies();
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
