import axios from 'axios';
import Header from '@/components/header/Header';
import './lyric-viewer.css';

const LyricViewer = () => {
  const getSongLyrics = async () => {
    const inputText = (
      document.querySelector('#lyric-search') as HTMLInputElement
    ).value;

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL_PREFIX}lyrics/get-search-results`,
      {
        params: {
          searchTerm: inputText,
        },
      }
    );
  };

  return (
    <>
      <Header />
      <div id="LyricViewer">
        <h1>Lyric viewer</h1>

        <label>Search for a song</label>
        <div>
          <input id="lyric-search" type="text" placeholder="Let it be..." />
          <button onClick={getSongLyrics}>Search</button>
        </div>
      </div>
    </>
  );
};

export default LyricViewer;
