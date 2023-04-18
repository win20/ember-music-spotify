import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Recommendations from './views/recommendations/Recommendations';
import StudyMode from './views/study-mode/StudyMode';
import Home from './views/home/Home';

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
    await axios.get(`${import.meta.env.VITE_API_URL_PREFIX}spotify`);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/StudyMode" element={<StudyMode />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
