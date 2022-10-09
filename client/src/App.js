import './App.css';
import Header from './components/header/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import url from 'url';

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
      <Header />
      <button onClick={testGetTrack}>Test Get Track</button>
      <h1>{test}</h1>
    </div>
  );
}

export default App;
