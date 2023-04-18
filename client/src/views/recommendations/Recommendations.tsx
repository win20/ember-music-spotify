import Header from '@components/header/Header';
import RecommendationForm from '@components/recommendation-form/RecommendationForm';
import RecommendationsDisplay from '@components/recommendations-display/RecommendationsDisplay';
import RecommendationsDisplayMobile from '@/components/recommendations-display-mobile/RecommendationsDisplayMobile';
import { useEffect, useState } from 'react';
import './recommendations.css';
import Song from '@models/Song';

const Recommendations = () => {
  const [songsList, setSongsList] = useState<Song[]>();
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  useEffect(() => {
    document.querySelector('#RecommendsationsDisplayMobile')?.scrollIntoView();
  }, [songsList]);

  const callback = (songs: Song[]) => {
    console.log(songs[0].name);
    setSongsList(songs);
  };

  return (
    <div>
      <Header />
      <div className="formAndChartCard">
        <div className="recommendationsForms">
          <RecommendationForm func={callback} />
        </div>
        {songsList ? (
          windowSize[0] > 1180 ? (
            <RecommendationsDisplay songs={songsList} />
          ) : (
            <RecommendationsDisplayMobile songs={songsList} />
          )
        ) : (
          <div></div>
        )}
      </div>
      <div id="page-bottom"></div>
    </div>
  );
};

export default Recommendations;
