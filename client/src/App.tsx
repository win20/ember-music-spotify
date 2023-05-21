import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Recommendations from './views/recommendations/Recommendations';
import Home from './views/home/Home';
import LyricViewer from './views/lyric-viewer/LyricViewer';

function App() {
  useEffect(() => {
    const getSpotifyAccessToken = async () => {
      const spotifyToken = await axios.get(
        `${import.meta.env.VITE_API_URL_PREFIX}spotify`
      );
      console.log(spotifyToken);
    };
    getSpotifyAccessToken();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/lyric-viewer" element={<LyricViewer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
