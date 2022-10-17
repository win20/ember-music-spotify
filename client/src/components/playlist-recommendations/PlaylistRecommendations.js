import 'components/playlist-recommendations/playlist-recommendations.css';

const PlaylistRecommendations = () => {
  return (
    <div className="PlaylistRecommendations">
      <h3>Get recommendations based on a playlist</h3>

      <form className="playlistRecommendationsForms">
        <label htmlFor="playlistSearch">Search for a playlist</label>
        <div>
          <input type="text" placeholder="workout, study, chill..." />
          <button>Search</button>
        </div>
      </form>
    </div>
  );
};

export default PlaylistRecommendations;
