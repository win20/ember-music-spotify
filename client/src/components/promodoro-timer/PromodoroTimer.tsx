import './promodoro-timer.css';
import { useState, MutableRefObject, Dispatch, SetStateAction } from 'react';

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
  const spotifyEmbed = (
    document.querySelector(
      'iframe[src*="spotify.com/embed"]'
    ) as HTMLIFrameElement
  ).contentWindow;

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

    spotifyEmbed?.postMessage({ command: 'toggle' }, '*');
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIsPlaying(false);
    spotifyEmbed?.postMessage({ command: 'toggle' }, '*');
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setIsPlaying(false);

    props.setTimer(props.startTime.minutes, props.startTime.seconds);

    props.minutesRef.current = props.startTime.minutes;
    props.secondsRef.current = props.startTime.seconds;
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
      </div>
      <iframe
        src="https://open.spotify.com/embed/track/1Acgi7wxVD9OF3iQnFe8Q4?utm_source=generator"
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default PromodoroTimer;
