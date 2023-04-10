import Header from 'components/header/Header';
import HomepagePlayer from 'components/homepage-player/HomepagePlayer';

const Home = () => {
  const overlayStyle = {
    display: 'none',
    width: '100%',
    height: '100%',
    position: 'absolute',
    'background-color': 'rgba(10,10,10, 0.3)',
  };
  return (
    <div id="Home">
      <div className="modal-overlay" style={overlayStyle}></div>
      <Header />
      <HomepagePlayer />
    </div>
  );
};

export default Home;
