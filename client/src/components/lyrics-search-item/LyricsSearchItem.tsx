import './lyric-search-item.css';

type Props = {
  image: string;
  title: string;
  artist: string;
  lyrics_url: string;
};

const LyricSearchItem = (props: Props) => {
  return (
    <a id="lyric-search-item-container" href={props.lyrics_url} target="_blank">
      <img id="cover-image" src={props.image} alt="" />
      <div id="item-text">
        <div id="title">{props.title}</div>
        <div id="artist">{props.artist}</div>
      </div>
    </a>
  );
};

export default LyricSearchItem;
