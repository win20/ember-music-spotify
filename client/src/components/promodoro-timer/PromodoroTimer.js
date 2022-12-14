import 'components/promodoro-timer/promodoro-timer.css';
import { useState } from 'react';

const PromodoroTimer = () => {
  const [minutes, setMinutes] = useState('10');
  const [seconds, setSeconds] = useState('00');

  const startMinutes = 10;
  let time = startMinutes * 60;

  const updateCountdown = () => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    setMinutes(minutes);
    setSeconds(seconds);

    time--;
  };

  const startTimer = () => {
    setInterval(updateCountdown, 1000);
  };

  return (
    <div className="PromodoroContainer">
      <h1>
        {minutes} : {seconds}
      </h1>

      <div id="timerBottomButtons">
        <button id="timerStartBtn" onClick={startTimer}>
          Start
        </button>
        <button id="timerResetBtn">Reset</button>
      </div>
    </div>
  );
};

export default PromodoroTimer;
