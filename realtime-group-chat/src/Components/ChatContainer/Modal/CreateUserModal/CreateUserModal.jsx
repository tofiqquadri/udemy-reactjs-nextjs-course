import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './CreateUserModal.module.css';

export default function CreateUserModal({
    onCloseCreateUserModalHandler,
    onCreateUserNameHandler
}) {
    const [isBrowser, setIsBrowser] = useState(false);
    const [userName, setUserName] = useState('');
    const [isMaxLengthError, setIsMaxLengthError] = useState(false);
    const [isMinLengthError, setIsMinLengthError] = useState(false);

    const onInputChangeHandler = (event) => {
        event.preventDefault();
        const userNameInputValue = event.target.value;

        setIsMaxLengthError(false);
        setIsMinLengthError(false);

        if (userNameInputValue.length < 3) {
            setIsMinLengthError(true);
        } else if (userNameInputValue.length > 12) {
            setIsMaxLengthError(true);
        }

        setUserName(userNameInputValue);
    };

    const onSubmitUserNameHandler = () => {
        if (userName && !isMaxLengthError && !isMinLengthError) {
            onCreateUserNameHandler(userName.trim());
            onCloseCreateUserModalHandler();
        }
    };

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    let modalUI = isBrowser
        ? ReactDOM.createPortal(
              <div className="modal d-block">
                  <div
                      className={`position-fixed h-100 w-100 ${styles.Backdrop}`}></div>
                  <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title">Create User</h5>
                          </div>
                          <div className="modal-body">
                              <div className="input-group has-validation">
                                  <span className="input-group-text">@</span>
                                  <div className="form-floating is-invalid">
                                      <input
                                          type="text"
                                          className="form-control is-invalid"
                                          id="floatingInputGroup2"
                                          placeholder="Username"
                                          required
                                          value={userName}
                                          onChange={onInputChangeHandler}
                                      />
                                      <label htmlFor="floatingInputGroup2">
                                          Username
                                      </label>
                                  </div>
                                  {isMinLengthError ? (
                                      <div className="invalid-feedback">
                                          Min length should be 3 characters.
                                      </div>
                                  ) : null}
                                  {isMaxLengthError ? (
                                      <div className="invalid-feedback">
                                          Max length should be 12 characters.
                                      </div>
                                  ) : null}
                              </div>
                          </div>
                          <div className="modal-footer">
                              <button
                                  type="button"
                                  className="btn btn-primary"
                                  disabled={
                                      !userName ||
                                      isMaxLengthError ||
                                      isMinLengthError
                                  }
                                  onClick={onSubmitUserNameHandler}>
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
