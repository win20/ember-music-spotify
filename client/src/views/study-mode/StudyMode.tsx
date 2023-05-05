import { useState, useRef } from 'react';
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

  return (
    <div className="StudyModePage">
      <Helmet>
        <title>Ember Music - Study Mode</title>
      </Helmet>
      <Header />
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
