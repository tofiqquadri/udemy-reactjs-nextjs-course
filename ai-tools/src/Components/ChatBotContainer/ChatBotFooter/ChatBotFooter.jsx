import React from 'react';

export default function ChatBotFooter({
    message,
    onInputChangeHandler,
    onSubmitUserMessageHandler
}) {
    return (
        <div className="input-group mb-3 py-1">
            <input
                className="form-control rounded-0"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={onInputChangeHandler}
            />
            <button
                disabled={!message}
                className="bg-white border-0"
                onClick={onSubmitUserMessageHandler}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1933/1933005.png"
                    height="20px"
                    width="20px"
                    alt=""
                    className="me-1"
                />
            </button>
        </div>
    );
}
