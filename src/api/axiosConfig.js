import axios from "axios";

export default axios.create({
  baseURL: 'https://api-movies.fly.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});
