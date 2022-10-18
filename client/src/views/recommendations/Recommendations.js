import Header from 'components/header/Header';
import RecommendationForm from 'components/recommendation-form/RecommendationForm';
import PlaylistRecommendations from 'components/playlist-recommendations/PlaylistRecommendations';

const Recommendations = () => {
  const recommendationsFormsStyling = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const formAndChartCardStyling = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <div>
      <Header />
      <div style={formAndChartCardStyling} className="formAndChartCard">
        <div
          style={recommendationsFormsStyling}
          className="recommendationsForms"
        >
          <RecommendationForm />
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
