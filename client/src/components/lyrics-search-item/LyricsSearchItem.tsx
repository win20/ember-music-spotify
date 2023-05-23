import './lyric-search-item.css';

type Props = {
  image: string;
  title: string;
  artist: string;
};

const LyricSearchItem = (props: Props) => {
  return (
    <div id="lyric-search-item-container">
      <img id="cover-image" src={props.image} alt="" />
      <div id="item-text">
        <div id="title">{props.title}</div>
        <div id="artist">{props.artist}</div>
      </div>
    </div>
  );
};

export default LyricSearchItem;
