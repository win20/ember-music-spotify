import './lyric-search-item.css';

type Props = {
  image: string;
  title: string;
  artist: string;
};

const LyricSearchItem = (props: Props) => {
  return (
    <div id="lyric-search-item-container">
      <img
        id="cover-image"
        src="https://images.genius.com/92f06c735acd852cb7f68a1f1f2c4cdc.300x300x1.jpg"
        alt=""
      />
      <div id="item-text">
        <div id="title">Title</div>
        <div id="artist">Artist</div>
      </div>
    </div>
  );
};

export default LyricSearchItem;
