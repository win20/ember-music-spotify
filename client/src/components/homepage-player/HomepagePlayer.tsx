import './homepage-player.css';
import { useEffect, useState, useRef, SyntheticEvent } from 'react';
import axios from 'axios';
import playIcon from '@assets/icons/play-icon.png';
import pauseIcon from '@assets/icons/pause-icon.png';
import LoadingScreen from '@components/loading-screen/LoadingScreen';
import ErrorModal from '@components/error-modal/ErrorModal';
import ErrorDisplay from '@components/error-display/ErrorDisplay';

const HomepagePlayer = () => {
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [songCover, setSongCover] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [songUrl, setSongUrl] = useState('');
  const progressContainer = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isDailySongFetchError, setIsDailySongFetchError] = useState<boolean>(false);

  useEffect(() => {
    fetchDailySong();
  }, []);

  const fetchDailySong = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL_PREFIX}spotify/getDailySong`)
      .then((response) => {
        setSongTitle(response.data['track']['track']['name']);
        setSongArtist(response.data['track']['track']['artists'][0]['name']);
        setSongCover(
          response.data['track']['track']['album']['images'][0]['url']
        );
        setAudioSrc(response.data['track']['track']['preview_url']);
        setSongUrl(response.data['track']['track']['external_urls']['spotify']);
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      })
      .catch((err) => {
        console.log(err);
        setIsDailySongFetchError(true);
        setIsLoading(false);
      });
  };

  const [playState, setPlayState] = useState(false);
  const playSong = () => {
    if (audioSrc == null) {
      (document.querySelector('#ErrorModal') as HTMLElement).style.display =
        'block';
      (document.querySelector('#modal-overlay') as HTMLElement).style.display =
        'block';
      return;
    }
    (document.querySelector('#audio') as HTMLAudioElement).play();
    setPlayState(true);
  };

  const pauseSong = () => {
    (document.querySelector('#audio') as HTMLAudioElement).pause();
    setPlayState(false);
  };

  // Update progress visual every second
  const updateProgress = (e: SyntheticEvent<HTMLAudioElement>) => {
    const progress = document.querySelector('.progress') as HTMLElement;
    const { duration, currentTime } = e.target as HTMLAudioElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  };

  // Set progress on visual and audio when user clicks on the progress bar
  const setProgress = (e: MouseEvent) => {
    const width = progressContainer.current?.clientWidth;
    const clickX = e.clientX - (e.target as HTMLDivElement).offsetLeft;
    const audio = document.querySelector('#audio') as HTMLAudioElement;
    const duration = audio.duration;

    audio.currentTime = (width && (clickX / width) * duration) as number;
  };

  return (
    <div id="HomepagePlayer">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <h1>Featured Song</h1>

            {isDailySongFetchError ? (
              <ErrorDisplay message='Sorry, an error occured when fetching the daily featured song'/>
            ) : (

            <div>
              <div id="songDetails">
                <h3>{songTitle}</h3>
                <p>{songArtist}</p>
              </div>
              <img id="songCover" src={songCover} alt="" />
              <audio
                src={audioSrc}
                id="audio"
                onTimeUpdate={updateProgress}
              ></audio>

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
                  onClick={() => setProgress}
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
            )}
        </div>
      )}
      <ErrorModal />
    </div>
  );
};

export default HomepagePlayer;
