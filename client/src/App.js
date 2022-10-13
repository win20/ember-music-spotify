import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Recommendations from 'views/recommendations/Recommendations';

import Home from 'views/home/Home';

function App() {
  useEffect(() => {
    getSpotifyAccessToken();
  }, []);

  const getSpotifyAccessToken = async () => {
    await axios.get(`http://localhost:3001/spotify`);
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
