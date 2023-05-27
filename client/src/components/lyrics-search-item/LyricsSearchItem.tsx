import './lyric-search-item.css';
import axios from 'axios';

type Props = {
  image: string;
  title: string;
  artist: string;
  lyrics_url: string;
};

const LyricSearchItem = (props: Props) => {
  const getLyrics = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL_PREFIX}lyrics/get-lyrics`,
      {
        params: {
          url: props.lyrics_url,
        },
      }
    );

    console.log(response.data);
  };

  return (
    <div id="lyric-search-item-container" onClick={getLyrics}>
      <img id="cover-image" src={props.image} alt="" />
      <div id="item-text">
        <div id="title">{props.title}</div>
        <div id="artist">{props.artist}</div>
      </div>
    </div>
  );
};

export default LyricSearchItem;
