import React from 'react';
import styles from './MessageBox.module.css';

export default function MessageBox({ userName, name, message }) {
    let messageBoxContainerClasses = [];
    if (userName === name) {
        messageBoxContainerClasses = ['text-right', 'justify-content-end'];
    }

    return (
        <div
            className={`d-flex align-item-center ${messageBoxContainerClasses.join(
                ' '
            )}`}>
            <div className="px-2">
                <span className="name">{name}</span>
                <p className={styles.MessageBox}>{message}</p>
            </div>
        </div>
    );
}
