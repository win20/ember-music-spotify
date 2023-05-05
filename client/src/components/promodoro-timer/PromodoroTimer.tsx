import axios from 'axios';
import './promodoro-timer.css';
import {
  useState,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import Song from '@/models/Song';

type Prop = {
  isDefaultTime: boolean;
  setIsDefaultTime: Dispatch<SetStateAction<boolean>>;
  startTime: { minutes: number; seconds: number };
  minutes: number;
  seconds: number;
  minutesRef: MutableRefObject<number>;
  secondsRef: MutableRefObject<number>;
  setTimer: (minutes: number, seconds: number) => void;
};

const PromodoroTimer = (props: Prop) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number>(0);
  const [songsList, setSongsList] = useState<Song[] | undefined>(undefined);
  const [songToShowIndex, setSongToShowIndex] = useState<number>(0);
  const [currentSongDuration, setCurrentSongDuration] = useState<number>(0);

  const getRecommendations = async (isRefresh = false) => {
    const apiUrl = import.meta.env.VITE_API_URL_PREFIX;
    await axios
      .get(`${apiUrl}spotify/getRecommendations`, {
        params: {
          genre: 'classical',
          artistId: '1JVGbsUCqcTgrQP6qc3LEe',
          songId: '2YFtpiy2WoAQVQbM1SIwES',
        },
      })
      .then((response) => {
        setSongsList(response.data.tracks);
      });
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  const displaySpotifyEmbeds = () => {
    if (songsList !== undefined) {
      // setCurrentSongDuration(songsList[songToShowIndex].duration_ms);
      return (
        <iframe
          id="spotifyEmbed"
          src={`https://open.spotify.com/embed/track/${songsList[songToShowIndex].id}?utm_source=generator&autoplay=1`}
          width="100%"
          height="152"
          loading="lazy"
          allow="autoplay;"
        ></iframe>
      );
    }
  };

  const startTimer = () => {
    props.setIsDefaultTime(false);
    setIsPlaying(true);

    let interval = setInterval(() => {
      if (props.secondsRef.current >= 0) {
        props.setTimer(props.minutesRef.current, props.secondsRef.current - 1);
      }
      if (props.secondsRef.current < 0) {
        props.setTimer(props.minutesRef.current - 1, props.secondsRef.current);
        props.setTimer(props.minutesRef.current, 59);
        props.secondsRef.current = 59;
      }
    }, 1000);

    setIntervalId(interval);
    const spotifyEmbed = (
      document.querySelector(
        'iframe[src*="spotify.com/embed"]'
      ) as HTMLIFrameElement
    ).contentWindow;

    spotifyEmbed?.postMessage({ command: 'toggle' }, '*');

    let spotifyInterval = setInterval(() => {
      console.log('next song');
      setSongToShowIndex(songToShowIndex + 1);

      const spotifyEmbed = (
        document.querySelector(
          'iframe[src*="spotify.com/embed"]'
        ) as HTMLIFrameElement
      ).contentWindow;
      spotifyEmbed?.postMessage({ command: 'toggle' }, '*');
    }, 5000);
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIsPlaying(false);
    const spotifyEmbed = (
      document.querySelector(
        'iframe[src*="spotify.com/embed"]'
      ) as HTMLIFrameElement
    ).contentWindow;
    spotifyEmbed?.postMessage({ command: 'toggle' }, '*');
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setIsPlaying(false);

    props.setTimer(props.startTime.minutes, props.startTime.seconds);

    props.minutesRef.current = props.startTime.minutes;
    props.secondsRef.current = props.startTime.seconds;
  };

  const test = async () => {
    const response = await axios.get('http://localhost:3001/');
    console.log(response);
  };

  return (
    <div className="PromodoroContainer">
      {props.isDefaultTime ? (
        <h1>
          {props.startTime.minutes}:
          {props.startTime.seconds < 10
            ? `0${props.startTime.seconds}`
            : props.startTime.seconds}
        </h1>
      ) : (
        <h1>
          {props.minutes}:
          {props.seconds < 10 ? `0${props.seconds}` : props.seconds}
        </h1>
      )}

      <div id="timerBottomButtons">
        {isPlaying ? (
          <button id="timerStartBtn" onClick={pauseTimer}>
            Pause
          </button>
        ) : (
          <button id="timerStartBtn" onClick={startTimer}>
            Start
          </button>
        )}

        <button id="timerResetBtn" onClick={resetTimer}>
          Reset
        </button>
        <button onClick={test}>test</button>
      </div>
      {displaySpotifyEmbeds()}
      {/* <iframe */}
      {/*   id="spotifyEmbed" */}
      {/*   src={`https://open.spotify.com/embed/track/${songId}?utm_source=generator`} */}
      {/*   width="100%" */}
      {/*   height="152" */}
      {/*   loading="eager" */}
      {/* ></iframe> */}
    </div>
  );
};

export default PromodoroTimer;
