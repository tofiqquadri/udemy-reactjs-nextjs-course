import React from 'react';
import styles from './ChatBotMessageContainer.module.css';

export default function ChatBotMessageContainer({ messages }) {
    return (
        <div className={`${styles.MessageBoxContainer} px-3 py-4`}>
            {messages.map((message, messageIndex) => {
                return message.userType === 'user' ? (
                    <div
                        key={messageIndex}
                        className={`${styles.ReceiverMessage} d-flex align-items-center justify-content-end mt-3`}>
                        <p className={`${styles.MessageText} w-50 mb-0`}>
                            {message.message}
                        </p>
                    </div>
                ) : (
                    <div
                        key={messageIndex}
                        className={`${styles.SenderMessage} d-flex align-items-center mt-3`}>
                        <p className={`${styles.MessageText} w-50 mb-0`}>
                            {message.message}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
