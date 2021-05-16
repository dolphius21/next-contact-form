const Modal = ({ setShowModal, modal }) => {
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div className="overlay">
      <div className="nes-container is-rounded" id="modal-container">
        <button
          type="button"
          className="nes-btn is-error"
          id="close-btn"
          onClick={handleClose}
        >
          <i className="nes-icon close is-small"></i>
        </button>
        {modal === 'Success' ? (
          <>
            <i className="nes-icon trophy is-medium"></i>
            <h2 className="modal-heading nes-text is-success">Thank You!</h2>
          </>
        ) : (
          <>
            <i className="nes-icon close is-medium"></i>
            <h2 className="modal-heading nes-text is-error">Error!</h2>
          </>
        )}
        <p>
          {modal === 'Success'
            ? 'The form was submitted successfully. Rudolph will reply to your message as soon as possible.'
            : 'Ooops!, Something went wrong!'}
        </p>
      </div>
    </div>
  );
};

export default Modal;
