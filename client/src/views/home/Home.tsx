import Header from '@components/header/Header';
import HomepagePlayer from '@components/homepage-player/HomepagePlayer';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div id="Home">
      <Helmet>
        <title>Ember Music - Home</title>
      </Helmet>
      <Header />
      <HomepagePlayer />
    </div>
  );
};

export default Home;
