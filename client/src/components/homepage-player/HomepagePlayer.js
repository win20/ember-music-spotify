import './homepage-player.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomepagePlayer = () => {
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [songCover, setSongCover] = useState('');

  useEffect(() => {
    fetchDailySong();
  }, []);

  const fetchDailySong = async () => {
    await axios
      .get(`http://localhost:3001/spotify/getDailySong`)
      .then((response) => {
        console.log(response.data);
        setSongTitle(response.data['track']['track']['name']);
        setSongArtist(response.data['track']['track']['artists'][0]['name']);
        setSongCover(
          response.data['track']['track']['album']['images'][0]['url']
        );
      });
  };

  return (
    <div id="HomepagePlayer">
      <h1>Featured Song</h1>
      <div id="songDetails">
        <h3>{songTitle}</h3>
        <p>{songArtist}</p>
      </div>
      <img id="songCover" src={songCover} alt="" />
    </div>
  );
};

export default HomepagePlayer;
