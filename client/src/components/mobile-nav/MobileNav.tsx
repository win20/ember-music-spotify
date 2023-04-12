import { Link } from 'react-router-dom';
import './mobile-nav.css';
import closeIcon from '@assets/icons/x-mark.png';
import { CSSProperties } from 'react';

const MobileNav = () => {
  const overlayStyle: CSSProperties = {
    display: 'none',
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(10,10,10, 0.3)',
    top: 0,
    left: 0,
  };

  const handleClose = () => {
    (document.querySelector('#MobileNav') as HTMLElement).style.display =
      'none';
    (document.querySelector('.modal-overlay') as HTMLElement).style.display =
      'none';
  };

  return (
    <>
      <div className="modal-overlay" style={overlayStyle}></div>
      <div id="MobileNav">
        <img id="mobile-nav-close-btn" src={closeIcon} onClick={handleClose} />
        <div id="mobile-nav-items">
          <Link to="/">Home</Link>
          <Link to="/recommendations">Recommendations</Link>
          <Link to="/studyMode">Study mode</Link>
        </div>
      </div>
    </>
  );
};
export default MobileNav;
