import 'components/promodoro-timer/promodoro-timer.css';
import { useState, useEffect, useRef } from 'react';

const PromodoroTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  let startTime = {
    minutes: 5,
    seconds: 5,
  };

  const [minutes, setMinutes] = useState(startTime.minutes);
  const [seconds, setSeconds] = useState(startTime.seconds);

  const secondsRef = useRef(seconds);
  const minutesRef = useRef(minutes);

  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    setIsPlaying(true);
    let interval = setInterval(() => {
      if (secondsRef.current >= 0) {
        setSeconds(secondsRef.current - 1);
        secondsRef.current--;
      }
      if (secondsRef.current < 0) {
        setMinutes(minutesRef.current - 1);
        minutesRef.current--;
        setSeconds(59);
        secondsRef.current = 59;
      }
    }, 1000);

    setIntervalId(interval);
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIsPlaying(false);
  };

  return (
    <div className="PromodoroContainer">
      <h1>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>

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

        <button id="timerResetBtn">Reset</button>
      </div>
    </div>
  );
};

export default PromodoroTimer;
