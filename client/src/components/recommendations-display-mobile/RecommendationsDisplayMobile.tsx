import './recommendations-display-mobile.css';
import rightIcon from '@assets/icons/right-arrow.png';

const SongsItems = (props: any) => {
  return props.songs.slice(0, 9).map((song: any) => (
    <a
      target={'_blank'}
      rel="noopener noreferrer"
      href={song.external_urls.spotify}
      key={song.title}
    >
      <div key={song.id} className="song-item">
        <img src={song.album.images[0].url} alt="" />
        <div className="song-details">
          <div className="song-name">{song.name}</div>
          <div>{song.artists[0].name}</div>
          {/* <div id="song-link">Go to song page</div> */}
          <img src={rightIcon} id="right-arrow-cta" alt="right arrow cta" />
        </div>
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
