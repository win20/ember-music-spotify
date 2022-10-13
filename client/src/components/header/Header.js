import logoLight from 'assets/logo/red-on-white.png';
import searchIcon from 'assets/icons/search.png';
import 'components/header/header.css';

const Header = () => {
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
            <img id="searchIcon" src={searchIcon} alt="" />
          </button>
        </form>
      </div>

      <div className="header-links">
        <a href="/recommendations" id="recommendations-link">
          Recommendations
        </a>
        <a href="/" id="login-link">
          Login
        </a>
        <a href="/" id="register-link">
          Register
        </a>
      </div>
    </div>
  );
};

export default Header;
