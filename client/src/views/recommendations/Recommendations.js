import Header from 'components/header/Header';
import RecommendationForm from 'components/recommendation-form/RecommendationForm';
import RecommendationsDisplay from 'components/recommendations-display/RecommendationsDisplay';
import HomepagePlayer from 'components/homepage-player/HomepagePlayer';
import { useState } from 'react';

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

  const [songsList, setSongsList] = useState(undefined);

  const callback = (songs) => {
    setSongsList(songs);
  };

  return (
    <div>
      <Header />
      <div style={formAndChartCardStyling} className="formAndChartCard">
        <div
          style={recommendationsFormsStyling}
          className="recommendationsForms"
        >
          <RecommendationForm func={callback} />
        </div>
        {/* <RecommendationsDisplay /> */}
        {songsList && <RecommendationsDisplay songs={songsList} />}
      </div>
    </div>
  );
};

export default Recommendations;
