import { useState, useRef } from 'react';
import axios from 'axios';
import Header from '@components/header/Header';
import PromodoroTimer from '@components/promodoro-timer/PromodoroTimer';
import PromodoroInput from '@/components/promodoro-input/PromodoroInput';
import { Helmet } from 'react-helmet';

const StudyMode = () => {
  const [startTime, setStartTime] = useState<{
    minutes: number;
    seconds: number;
  }>({
    minutes: 25,
    seconds: 0,
  });

  const [isDefaultTime, setIsDefaultTime] = useState<boolean>(true);
  const [minutes, setMinutes] = useState<number>(startTime.minutes);
  const [seconds, setSeconds] = useState<number>(startTime.seconds);

  const minutesRef = useRef<number>(minutes);
  const secondsRef = useRef<number>(seconds);

  // const login = async () => {
  //   // axios.get('http://localhost:3001/spotify/spotifylogin');
  //   axios
  //     .get('http://localhost:3001/spotify/spotifylogin')
  //     .then((response) => response)
  //     .then((data) => console.log(data));
  // };

  const editTimer = (minutes: number, seconds: number) => {
    if (!isNaN(minutes) && !isNaN(seconds)) {
      setIsDefaultTime(false);
      setMinutes(minutes);
      setSeconds(seconds);
      minutesRef.current = minutes;
      secondsRef.current = seconds;
      setStartTime({ minutes, seconds });
    }
  };

  const updateTimer = (minutes: number, seconds: number) => {
    setIsDefaultTime(false);
    setMinutes(minutes);
    setSeconds(seconds);
    minutesRef.current = minutes;
    secondsRef.current = seconds;
  };

  const clientId = 'ae1b2db7d46c4f10865278144d32dcaf';
  const redirectUrl = 'http://localhost:5173/studyMode';
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const responseType = 'code';

  return (
    <div className="StudyModePage">
      <Helmet>
        <title>Ember Music - Study Mode</title>
      </Helmet>
      <Header />
      {/* <button onClick={login}>Login</button> */}
      <a
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=${responseType}`}
      >
        Login
      </a>
      <PromodoroInput setTimer={editTimer} />
      <PromodoroTimer
        isDefaultTime={isDefaultTime}
        setIsDefaultTime={setIsDefaultTime}
        startTime={startTime}
        minutes={minutes}
        seconds={seconds}
        minutesRef={minutesRef}
        secondsRef={secondsRef}
        setTimer={updateTimer}
      />
    </div>
  );
};

export default StudyMode;
