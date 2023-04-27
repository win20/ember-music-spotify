import Header from '@components/header/Header';
import PromodoroTimer from '@components/promodoro-timer/PromodoroTimer';
import PromodoroPlayer from '@components/promodoro-player/PromodoroPlayer';
import { Helmet } from 'react-helmet';

const StudyMode = () => {
  return (
    <div className="StudyModePage">
      <Helmet>
        <title>Ember Music - Study Mode</title>
      </Helmet>
      <Header />
      <PromodoroTimer />
      <PromodoroPlayer />
    </div>
  );
};

export default StudyMode;
