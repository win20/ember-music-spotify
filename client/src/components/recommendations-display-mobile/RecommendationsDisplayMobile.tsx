import './recommendations-display-mobile.css';
import rightIcon from '@assets/icons/right-arrow.png';
import Song from '@/models/Song';

type SongsProp = {
  songs: Song[];
};

const RecommendationsDisplayMobile = (props: SongsProp) => {
  return (
    <div id="RecommendsationsDisplayMobile">
      <div className="songContainer">
        {props.songs.slice(0, 9).map((song: Song) => {
          return (
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              href={song.external_urls.spotify}
              key={song.id}
            >
              <div className="song-item">
                <img src={song.album.images[0].url} alt="" />
                <div className="song-details">
                  <div className="song-name">{song.name}</div>
                  <div>{song.artists[0].name}</div>
                  <img
                    src={rightIcon}
                    id="right-arrow-cta"
                    alt="right arrow cta"
                  />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsDisplayMobile;
