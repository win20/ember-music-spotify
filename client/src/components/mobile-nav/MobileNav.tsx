import { Link } from 'react-router-dom';
import './mobile-nav.css';
import closeIcon from '@assets/icons/x-mark.png';

const MobileNav = () => {
  const handleClose = () => {
    (document.querySelector('#MobileNav') as HTMLElement).style.display =
      'none';
    (document.querySelector('.modal-overlay') as HTMLElement).style.display =
      'none';
  };
  return (
    <div id="MobileNav">
      <img id="mobile-nav-close-btn" src={closeIcon} onClick={handleClose} />
      <div id="mobile-nav-items">
        <Link to="/">Home</Link>
        <Link to="/recommendations">Recommendations</Link>
        <Link to="/studyMode">Study mode</Link>
      </div>
    </div>
  );
};
export default MobileNav;
