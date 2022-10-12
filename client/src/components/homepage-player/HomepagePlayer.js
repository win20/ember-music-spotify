import './homepage-player.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import infoIcon from 'assets/icons/info.png';
import playIcon from 'assets/icons/play-icon.png';
import pauseIcon from 'assets/icons/pause-icon.png';

const HomepagePlayer = () => {
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [songCover, setSongCover] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [songUrl, setSongUrl] = useState('');
  const progressContainer = useRef(null);

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
        setAudioSrc(response.data['track']['track']['preview_url']);
        setSongUrl(response.data['track']['track']['external_urls']['spotify']);
      });
  };

  const [playState, setPlayState] = useState(false);
  const playSong = () => {
    document.querySelector('#audio').play();
    setPlayState(true);
  };

  const pauseSong = () => {
    document.querySelector('#audio').pause();
    setPlayState(false);
  };

  // Update progress visual every second
  const updateProgress = (e) => {
    const progress = document.querySelector('.progress');
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  };

  // Set progress on visual and audio when user clicks on the progress bar
  const setProgress = (e) => {
    const width = progressContainer.current.clientWidth;
    const clickX = e.clientX - e.target.offsetLeft;
    const audio = document.querySelector('#audio');
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  };

  return (
    <div id="HomepagePlayer">
      <h1>Featured Song</h1>
      <div id="songDetails">
        <h3>{songTitle}</h3>
        <p>{songArtist}</p>
      </div>
      <img id="songCover" src={songCover} alt="" />
      <audio src={audioSrc} id="audio" onTimeUpdate={updateProgress}></audio>

      <div className="media-controls">
        {playState ? (
          <button className="media-btn" onClick={pauseSong}>
            <img src={pauseIcon} alt="pause" />
          </button>
        ) : (
          <button className="media-btn" onClick={playSong}>
            <img src={playIcon} alt="play" />
          </button>
        )}

        <div className="progressAndLink"></div>
        <div
          ref={progressContainer}
          className="progress-container"
          onClick={setProgress}
        >
          <div className="progress"></div>
        </div>

        <div className="linksContainer">
          <a
            href={songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="deezer-btn"
          >
            Full song on Spotify
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomepagePlayer;
