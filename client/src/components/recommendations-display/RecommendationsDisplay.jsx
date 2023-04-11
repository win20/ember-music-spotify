import 'components/recommendations-display/recommendations-display.css';

const SongsGridItems = (props) => {
  return props.songs.slice(0, 9).map((song) => (
    <div key={song.id} className="grid-item">
      <a
        target={'_blank'}
        rel="noopener noreferrer"
        href={song.external_urls.spotify}
      >
        <img src={song.album.images[0].url} alt="" />
      </a>
    </div>
  ));
};

const RecommendationsDisplay = (props) => {
  return (
    <div id="RecommendsationsDisplay">
      <div className="songGridContainer">
        <SongsGridItems songs={props.songs} />
      </div>
    </div>
  );
};

export default RecommendationsDisplay;
