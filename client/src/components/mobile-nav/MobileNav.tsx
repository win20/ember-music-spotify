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
        <a href="/">Home</a>
        <a href="/recommendations">Recommendations</a>
        <a href="/studyMode">Study mode</a>
      </div>
    </div>
  );
};
export default MobileNav;
