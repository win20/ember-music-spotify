import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Home from 'views/home/Home';

function App() {
  const [test, setTest] = useState('');

  useEffect(() => {
    getSpotifyAccessToken();
  }, []);

  const getSpotifyAccessToken = async () => {
    await axios.get(`http://localhost:3001/spotify`);
  };

  const testGetTrack = async () => {
    await axios
      .get(`http://localhost:3001/spotify/getFeaturedPlaylists`)
      .then((response) => {
        setTest(response.data.playlists.items[0].name);
        console.log(response.data.playlists);
      });
  };

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
