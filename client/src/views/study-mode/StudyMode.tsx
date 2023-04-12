import Header from '@components/header/Header';
import PromodoroTimer from '@components/promodoro-timer/PromodoroTimer';
import PromodoroPlayer from '@components/promodoro-player/PromodoroPlayer';

const StudyMode = () => {
  return (
    <div className="StudyModePage">
      <Header />
      <PromodoroTimer />
      <PromodoroPlayer />
    </div>
  );
};

export default StudyMode;
