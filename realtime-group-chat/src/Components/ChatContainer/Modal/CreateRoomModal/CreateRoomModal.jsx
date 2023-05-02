import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './CreateRoomModal.module.css';

export default function CreateRoomModal({
    onCloseCreateRoomModalHandler,
    onCreateRoomHandler
}) {
    const [isBrowser, setIsBrowser] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [isMaxLengthError, setIsMaxLengthError] = useState(false);
    const [isMinLengthError, setIsMinLengthError] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const onInputChangeHandler = (event) => {
        event.preventDefault();
        const roomNameInputValue = event.target.value;

        setIsMaxLengthError(false);
        setIsMinLengthError(false);

        if (roomNameInputValue.length < 3) {
            setIsMinLengthError(true);
        } else if (roomNameInputValue.length > 12) {
            setIsMaxLengthError(true);
        }

        setRoomName(roomNameInputValue);
    };

    const onSubmitRoomNameHandler = () => {
        if (roomName && !isMinLengthError && !isMaxLengthError) {
            onCreateRoomHandler(roomName.trim());
            onCloseCreateRoomModalHandler();
        }
    };

    let modalUI = isBrowser
        ? ReactDOM.createPortal(
              <div className="modal d-block">
                  <div
                      className={`${styles.Backdrop} position-fixed h-100 w-100`}
                      onClick={onCloseCreateRoomModalHandler}></div>
                  <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title">Create Room</h5>
                              <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                  onClick={
                                      onCloseCreateRoomModalHandler
                                  }></button>
                          </div>
                          <div className="modal-body">
                              <label
                                  htmlFor="room-name"
                                  className="col-form-label"></label>
                              <input
                                  type="text"
                                  id="room-name"
                                  className="form-control"
                                  placeholder="Room Name *Required"
                                  onChange={onInputChangeHandler}
                              />
                              {isMinLengthError ? (
                                  <p className="text-danger">
                                      Min length should be 3 characters.
                                  </p>
                              ) : null}
                              {isMaxLengthError ? (
                                  <p className="text-danger">
                                      Max length should be 12 characters.
                                  </p>
                              ) : null}
                          </div>
                          <div className="modal-footer">
                              <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={onSubmitRoomNameHandler}
                                  disabled={
                                      !roomName ||
                                      isMaxLengthError ||
                                      isMinLengthError
                                  }>
                                  Create
                              </button>
                          </div>
                      </div>
                  </div>
              </div>,
              document.getElementById('_nextjs-modal-root')
          )
        : null;

    return modalUI;
}
