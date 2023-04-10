import './mobile-nav.css';
import closeIcon from 'assets/icons/x-mark.png';

const MobileNav = () => {
  const handleClose = () => {
    document.querySelector('#MobileNav').style.display = 'none';
    document.querySelector('.modal-overlay').style.display = 'none';
  };
  return (
    <div id="MobileNav">
      <img id="mobile-nav-close-btn" src={closeIcon} onClick={handleClose} />
      <div id="mobile-nav-items">
        <div>Recommendations</div>
        <div>Study mode</div>
      </div>
    </div>
  );
};
export default MobileNav;
