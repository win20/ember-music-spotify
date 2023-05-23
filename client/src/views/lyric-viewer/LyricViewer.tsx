import axios from 'axios';
import Header from '@/components/header/Header';
import LyricSearchItem from '@/components/lyrics-search-item/LyricsSearchItem';
import './lyric-viewer.css';
import { useState } from 'react';

const LyricViewer = () => {
  const [searchResults, setSearchResults] = useState([]);

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

    setSearchResults(response.data.response.hits);
    console.log(response.data.response.hits[0]);
  };

  const renderSearchResults = () => {
    return searchResults.map((item: any) => {
      return (
        <LyricSearchItem
          image={item.result.header_image_thumbnail_url}
          title={item.result.title}
          artist={item.result.artist_names}
          lyrics_url={item.result.url}
        />
      );
    });
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

      {searchResults.map((item: any) => {
        return (
          <div className="search-result-item" key={item.result.id}>
            <LyricSearchItem
              image={item.result.header_image_thumbnail_url}
              title={item.result.title}
              artist={item.result.artist_names}
              lyrics_url={item.result.url}
            />
          </div>
        );
      })}
    </>
  );
};

export default LyricViewer;
