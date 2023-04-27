import './recommendations-display.css';
import Song from '@/models/Song';

type SongsProp = {
  songs: Song[];
};

const RecommendationsDisplay = (props: SongsProp) => {
  return (
    <div id="RecommendsationsDisplay">
      <div className="songGridContainer">
        {props.songs.slice(0, 9).map((song: Song) => {
          return (
            <div key={song.id} className="grid-item">
              <a
                target={'_blank'}
                rel="noopener noreferrer"
                href={song.external_urls.spotify}
              >
                <img src={song.album.images[0].url} alt="song cover art" />
              </a>
              <span>{song.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsDisplay;
