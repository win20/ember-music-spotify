import Header from '@/components/header/Header';
import './lyric-viewer.css';

const LyricViewer = () => {
  return (
    <>
      <Header />
      <div id="LyricViewer">
        <h1>Lyric viewer</h1>

        <label>Search for a song</label>
        <div>
          <input type="text" placeholder="Let it be..." />
          <button>Search</button>
        </div>
      </div>
    </>
  );
};

export default LyricViewer;
