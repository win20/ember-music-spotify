import './App.css';
import { CSSProperties, useEffect } from 'react';
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
    const test = await axios.get(
      `${import.meta.env.VITE_API_URL_PREFIX}spotify`
    );
    console.log('TEST: ');
  };

  const overlayStyle: CSSProperties = {
    display: 'none',
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(10,10,10, 0.3)',
  };
  return (
    <div className="App">
      <div className="modal-overlay" style={overlayStyle}></div>

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
