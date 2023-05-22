import axios from 'axios';
import Header from '@/components/header/Header';
import LyricSearchItem from '@/components/lyrics-search-item/LyricsSearchItem';
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

        <div>
          <label>Search for a song</label>
          <input id="lyric-search" type="text" placeholder="Let it be..." />
          <button onClick={getSongLyrics}>Search</button>
        </div>
      </div>

      <LyricSearchItem />
    </>
  );
};

export default LyricViewer;
