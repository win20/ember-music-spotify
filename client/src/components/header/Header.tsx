import logoLight from '@assets/logo/red-on-white.png';
import searchIcon from '@assets/icons/search.png';
import menuIcon from '@assets/icons/menu.png';
import './header.css';
import MobileNav from '@components/mobile-nav/MobileNav';
import { Link } from 'react-router-dom';

const Header = () => {
  const handleMenuClick = () => {
    (document.querySelector('#MobileNav') as HTMLElement).style.display =
      'flex';
    (document.querySelector('.modal-overlay') as HTMLElement).style.display =
      'block';
  };

  return (
    <div id="HeaderContainer">
      <Link to="/" className="logoHomeLink">
        <img className="logo" src={logoLight} alt="" />
      </Link>
      <div className="search-container">
        <form action="">
          <input
            className="searchBar"
            type="text"
            placeholder="Search song, artist, album..."
          />
          <button type="submit" className="searchButton">
            <Link to="/">
              <img id="searchIcon" src={searchIcon} alt="" />
            </Link>
          </button>
        </form>
      </div>
      <div className="header-links">
        <Link to="/recommendations" id="recommendations-link">
          Recommendations
        </Link>
        <Link to="/lyric-viewer" id="lyric-viewer-link">
          Lyrics viewer
        </Link>
      </div>
      <img id="menu-icon" src={menuIcon} onClick={handleMenuClick} />
      <div></div>
      <MobileNav />
    </div>
  );
};

export default Header;
