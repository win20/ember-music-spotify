import axios from 'axios';
import Header from '@/components/header/Header';
import LyricSearchItem from '@/components/lyrics-search-item/LyricsSearchItem';
import './lyric-viewer.css';
import { useState } from 'react';
import loadingSpinner from '@assets/imgs/pulse-loading.gif';
import { Helmet } from 'react-helmet';
import LyricsDisplay from '@/components/lyrics-display/LyricsDisplay';

const LyricViewer = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lyricsArray, setLyricsArray] = useState<string[]>([]);

  const getSearchResults = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const getLyrics = async (url: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL_PREFIX}lyrics/get-lyrics`,
      {
        params: {
          url: url,
        },
      }
    );

    console.log(response.data);

    setLyricsArray(response.data.lyrics);
  };

  const lyricsTest = [
    'this is a lyric test',
    'this is the second line',
    'this is the third line',
    'fourth line',
  ];

  return (
    <>
      <Helmet>
        <title>Ember Music - Lyric Viewer</title>
      </Helmet>
      <Header />
      <div id="LyricViewer">
        <h1>Lyric viewer</h1>

        <div>
          <label>Search for a song</label>
          <input id="lyric-search" type="text" placeholder="Let it be..." />
          <button onClick={getSearchResults}>Search</button>
        </div>
      </div>

      <div id="search-results-container">
        {isLoading ? (
          <img
            id="loading-spinner"
            src={loadingSpinner}
            alt="loading spinner"
          />
        ) : (
          searchResults.map((item: any) => {
            return (
              <div
                className="search-result-item"
                key={item.result.id}
                onClick={() => getLyrics(item.result.url)}
              >
                <LyricSearchItem
                  image={item.result.header_image_thumbnail_url}
                  title={item.result.title}
                  artist={item.result.artist_names}
                  lyrics_url={item.result.url}
                />
              </div>
            );
          })
        )}
      </div>

      {lyricsArray && <LyricsDisplay lyricsArray={lyricsArray} />}
      {/* <LyricsDisplay lyricsArray={lyricsTest} /> */}
    </>
  );
};

export default LyricViewer;
