import './promodoro-timer.css';
import { useState, MutableRefObject, Dispatch, SetStateAction } from 'react';

type Props = {
  isDefaultTime: boolean;
  setIsDefaultTime: Dispatch<SetStateAction<boolean>>;
  startTime: { minutes: number; seconds: number };
  minutes: number;
  seconds: number;
  minutesRef: MutableRefObject<number>;
  secondsRef: MutableRefObject<number>;
  setTimer: (minutes: number, seconds: number) => void;
};

const PromodoroTimer = (props: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  let startTime = {
    minutes: 25,
    seconds: 0,
  };

  const [intervalId, setIntervalId] = useState<number>(0);

  const startTimer = () => {
    props.setIsDefaultTime(false);
    setIsPlaying(true);
    console.log(props.minutesRef.current);
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
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIsPlaying(false);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setIsPlaying(false);

    props.setTimer(startTime.minutes, startTime.seconds);

    props.minutesRef.current = startTime.minutes;
    props.secondsRef.current = startTime.seconds;
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
    </div>
  );
};

export default PromodoroTimer;
