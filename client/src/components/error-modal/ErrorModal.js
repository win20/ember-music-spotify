import 'components/error-modal/error-modal.css';
import closeIcon from 'assets/icons/x-mark.png';
const ErrorModal = () => {
  const closeModal = () => {
    document.querySelector('#ErrorModal').style.display = 'none';
    document.querySelector('#modal-overlay').style.display = 'none';
  };

  return (
    <>
      <div id="modal-overlay"></div>
      <div id="ErrorModal">
        <img onClick={closeModal} src={closeIcon} />
        <div>
          Sorry, but this song doesn't seem to have a preview available.
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
