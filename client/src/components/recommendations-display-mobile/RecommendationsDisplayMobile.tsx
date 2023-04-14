import './recommendations-display-mobile.css';

const SongsItems = (props: any) => {
  return props.songs.slice(0, 9).map((song: any) => (
    <a
      target={'_blank'}
      rel="noopener noreferrer"
      href={song.external_urls.spotify}
    >
      <div key={song.id} className="song-item">
        <img src={song.album.images[0].url} alt="" />
        <span>{song.name}</span>
      </div>
    </a>
  ));
};

const RecommendationsDisplayMobile = (props: any) => {
  return (
    <div id="RecommendsationsDisplayMobile">
      <div className="songContainer">
        <SongsItems songs={props.songs} />
      </div>
    </div>
  );
};

export default RecommendationsDisplayMobile;
