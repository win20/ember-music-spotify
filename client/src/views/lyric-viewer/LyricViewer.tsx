import Header from '@/components/header/Header';
import './lyric-viewer.css';

const LyricViewer = () => {
  const getSongLyrics = () => {};

  return (
    <>
      <Header />
      <div id="LyricViewer">
        <h1>Lyric viewer</h1>

        <label>Search for a song</label>
        <div>
          <input type="text" placeholder="Let it be..." />
          <button onClick={getSongLyrics}>Search</button>
        </div>
      </div>
    </>
  );
};

export default LyricViewer;
