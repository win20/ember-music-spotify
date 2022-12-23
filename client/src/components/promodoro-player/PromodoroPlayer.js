import 'components/promodoro-player/promodoro-player.css';
import coverImg from 'assets/imgs/cover.jpeg';

const PromodoroPlayer = () => {
  return (
    <div className="PromodoroPlayer">
      <div id="miniPlayerContainer">
        <div id="miniPlayerLeft">
          <img src={coverImg} alt="song cover" />
        </div>
        <div id="miniPlayerRight">
          <p id="songName">song name</p>
          <p id="artist">artist</p>
        </div>
      </div>
    </div>
  );
};

export default PromodoroPlayer;
