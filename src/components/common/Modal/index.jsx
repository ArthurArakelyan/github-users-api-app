import React from 'react';
import ReactModal from 'react-modal';

import './styles.css';

ReactModal.setAppElement('#root');

const Modal = (
  {
    modalType,
    modalIsOpen,
    modalClose,
    edittingUser,
    edittingValueChange,
    edittingModalSubmit,
    edittingUserTypeChange,
    edittingUserAvatarChange,
    creatingUser,
    creatingValueChange,
    creatingTypeChange,
    creatingAvatarUrlChange,
    creatingUserSubmit
  }
) => {
  const edittingContent = (
    <ModalContent
      title='Editting User'
      close={modalClose}
      submit={edittingModalSubmit}
    >
      <form className="modal__form" onSubmit={edittingModalSubmit}>
        <input
          className="modal__editting_input"
          value={edittingUser.login}
          onChange={edittingValueChange}
          type="text"
          autoFocus
          placeholder="Username"
        />

        <div className="modal__editting_type">
          <label>
            User
            <input type="radio" name="type" checked={edittingUser.type === 'User'} value="User" onChange={edittingUserTypeChange} />
          </label>
          <label>
            Admin
            <input type="radio" value="Admin" checked={edittingUser.type === 'Admin'} onChange={edittingUserTypeChange} name="type" />
          </label>
        </div>

        <input
          type="text"
          placeholder="Avatar URL"
          className="modal__editting_avatarUrl"
          value={edittingUser.avatar_url}
          onChange={edittingUserAvatarChange}
        />
      </form>
    </ModalContent>
  );

  const creatingContent = (
    <ModalContent
      title='Creating User'
      close={modalClose}
      submit={creatingUserSubmit}
    >
      <form className="modal__form" onSubmit={creatingUserSubmit}>
        <input
          type="text"
          placeholder="Enter Username..."
          className="modal__creating_input"
          value={creatingUser.login}
          onChange={creatingValueChange}
          autoFocus
        />

        <div className="modal__creating_type">
          <label>
            User
            <input
              type="radio"
              name="type"
              checked={creatingUser.type === 'User'}
              value="User"
              onChange={creatingTypeChange}
            />
          </label>
          <label>
            Admin
            <input
              type="radio"
              value="Admin"
              checked={creatingUser.type === 'Admin'}
              onChange={creatingTypeChange}
              name="type"
            />
          </label>
        </div>

        <input
          type="text"
          className="modal__creating_avatarUrl"
          placeholder="Avatar URL"
          value={creatingUser.avatar_url}
          onChange={creatingAvatarUrlChange}
        />
      </form>
    </ModalContent>
  );

  return (
    <ReactModal
      closeTimeoutMS={400}
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={modalClose}
      style={
        {
          content: { color: 'black', width: '500px', height: 'fit-content', margin: '0 auto', padding: '0' }
        }
      }
    >
      {modalType === 'create' ? creatingContent : edittingContent}
    </ReactModal>
  );
}

const ModalContent = ({ children, title, close, submit }) => {
  return (
    <>
      <div className="modal__header">
        <h2 className="modal__title">{title}</h2>
      </div>

      <div className="modal__body">
        {children}
      </div>

      <div className="modal__footer">
        <button
          className="modal__action modal__ok"
          onClick={submit}
        >
          OK
        </button>
        <button
          className="modal__action modal__close"
          onClick={close}
        >
          Close
        </button>
      </div>
    </>
  );
}

export default Modal;
