import React, { useState } from 'react';
import MessageBox from './MessageBox/MessageBox';
import styles from './ChatBoxContainer.module.css';

export default function ChatBoxContainer({
    userName,
    messages,
    onSendMessageHandler
}) {
    const [message, setMessage] = useState('');

    const onInputChangeHandler = (event) => {
        event.preventDefault();
        const messageValue = event.target.value;
        setMessage(messageValue);
    };

    const onSubmitHandler = () => {
        if (message) {
            onSendMessageHandler(message.trim());
            setMessage('');
        }
    };

    return (
        <div
            className={`${styles.ChatBoxContainer} d-flex flex-column justify-content-between pb-0`}>
            <div className={`scroll px-4 ${styles.ChatBoxWrapper}`}>
                {messages.map((message, messageIndex) => (
                    <MessageBox
                        key={messageIndex}
                        name={message.author}
                        message={message.message}
                        userName={userName}
                    />
                ))}
            </div>

            <div className="d-flex justify-content-between">
                <input
                    type="text"
                    className={`ps-2 ${styles.MessageInput}`}
                    placeholder="Type a message..."
                    value={message}
                    onChange={onInputChangeHandler}
                />
                <div className="d-flex justify-content-center pe-3">
                    <button
                        onClick={onSubmitHandler}
                        disabled={!message.trim()}
                        className="btn btn-success">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
