import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import RoomContainer from './RoomContainer/RoomContainer';
import ChatBoxContainer from './ChatBoxContainer/ChatBoxContainer';
const CreateUserModal = dynamic(() =>
    import('./Modal/CreateUserModal/CreateUserModal')
);
const CreateRoomModal = dynamic(() =>
    import('./Modal/CreateRoomModal/CreateRoomModal')
);

export default function ChatContainer({
    userName,
    selectedRoom,
    roomsList,
    messages,
    onCreateRoomHandler,
    onCreateUserNameHandler,
    onSelectRoomHandler,
    onSendMessageHandler
}) {
    const [showCreateUserModal, setShowCreateUserModal] = useState(true);
    const [showCreateRoomModal, setCreateRoomModal] = useState(false);
    const [isExistUserName, setIsExistUserName] = useState(true);

    useEffect(() => {
        if (localStorage && localStorage.getItem('username')) {
            setIsExistUserName(true);
        } else {
            setIsExistUserName(false);
        }
    }, []);

    const onCloseCreateUserModalHandler = () => {
        setShowCreateUserModal(false);
    };

    const onShowCreateRoomModalHandler = () => {
        setCreateRoomModal(true);
    };

    const onCloseCreateRoomModalHandler = () => {
        setCreateRoomModal(false);
    };

    let headerUI = (
        <header className="text-center">
            <h1 className="display-4">Realtime Group Chat</h1>
            <p className="lead mb-2">
                Collaborate with developers worldwide to solve a bigger problem.
            </p>

            <button
                type="button"
                className="btn btn-primary"
                onClick={onShowCreateRoomModalHandler}>
                Create Room
            </button>
        </header>
    );

    let createUserModalUI = (
        <CreateUserModal
            onCloseCreateUserModalHandler={onCloseCreateUserModalHandler}
            onCreateUserNameHandler={onCreateUserNameHandler}
        />
    );

    let createRoomModalUI = (
        <CreateRoomModal
            onCloseCreateRoomModalHandler={onCloseCreateRoomModalHandler}
            onCreateRoomHandler={onCreateRoomHandler}
        />
    );

    return (
        <>
            <div className="py-5 px-4">
                {headerUI}
                <div className="row overflow-hidden shadow mt-5">
                    <div className="col-5 px-0">
                        <RoomContainer
                            selectedRoom={selectedRoom}
                            roomsList={roomsList}
                            onSelectRoomHandler={onSelectRoomHandler}
                        />
                    </div>
                    <div className="col-7 px-0">
                        <ChatBoxContainer
                            messages={messages}
                            userName={userName}
                            onSendMessageHandler={onSendMessageHandler}
                        />
                    </div>
                </div>
            </div>
            {showCreateUserModal && !isExistUserName ? createUserModalUI : null}
            {showCreateRoomModal ? createRoomModalUI : null}
        </>
    );
}
