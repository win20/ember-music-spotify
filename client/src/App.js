import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Recommendations from 'views/recommendations/Recommendations';

import Home from 'views/home/Home';

function App() {
  useEffect(() => {
    getSpotifyAccessToken()
      .then((response) => {
        console.log('Success access token');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getSpotifyAccessToken = async () => {
    const test = await axios.get(`http://localhost:3001/spotify`);
    console.log('TEST: ');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
