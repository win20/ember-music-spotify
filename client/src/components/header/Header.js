import logoLight from 'assets/logo/red-on-white.png';
import searchIcon from 'assets/icons/search.png';
import menuIcon from 'assets/icons/menu.png';
import 'components/header/header.css';
import { useRef } from 'react';

const Header = () => {
  const menuItemsRef = useRef(null);

  const handleMenuClick = () => {
    menuItemsRef.current.style.display = 'block';
  };

  return (
    <div id="HeaderContainer">
      <a href="/" className="logoHomeLink">
        <img className="logo" src={logoLight} alt="" />
      </a>
      <div className="search-container">
        <form action="">
          <input
            className="searchBar"
            type="text"
            placeholder="Search song, artist, album..."
          />
          <button type="submit" className="searchButton">
            <a href="/">
              <img id="searchIcon" src={searchIcon} alt="" />
            </a>
          </button>
        </form>
      </div>
      <div className="header-links" ref={menuItemsRef}>
        <a href="/recommendations" id="recommendations-link">
          Recommendations
        </a>

        <a href="/studyMode" id="studymode-link">
          Study Mode
        </a>
      </div>
      <img id="menu-icon" src={menuIcon} onClick={handleMenuClick} />
      <div></div>
    </div>
  );
};

export default Header;
