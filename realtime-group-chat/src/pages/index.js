import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatContainer from 'Components/ChatContainer/ChatContainer';
import { LISTENERS, EVENTS } from 'Shared/Constants';

let socket;

export default function Home() {
    const [userName, setUserName] = useState('');
    const [roomsList, setRoomsList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [newMessage, setNewMessage] = useState(null);

    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io();

        socket.on(LISTENERS.CREATE_ROOM_RESPONSE, onCreateRoomResponseHandler);
        socket.on(
            LISTENERS.ALL_ROOMS_LIST_RESPONSE,
            onAllRoomsListResponseHandler
        );
        socket.on(LISTENERS.NEW_MESSAGE_RESPONSE, onNewMessageResponseHandler);
    };

    useEffect(() => {
        socketInitializer();
        if (localStorage && localStorage.getItem('username')) {
            setUserName(localStorage.getItem('username'));
        }

        return () => {
            if(socket) {
                socket.off(LISTENERS.ALL_ROOMS_LIST_RESPONSE);
                socket.off(LISTENERS.CREATE_ROOM_RESPONSE);
                socket.off(LISTENERS.NEW_MESSAGE_RESPONSE)
            }
        }
    }, []);

    useEffect(() => {
        onUpdateRoomsForMessages();
    }, [roomsList]);

    useEffect(() => {
        if(newMessage && roomsList) {
            let updatedRoomsList = [...roomsList];
            updatedRoomsList = updatedRoomsList.filter((room) => room.name !== newMessage.name);
            updatedRoomsList = [...updatedRoomsList, {...newMessage}];
            onUpdateRoomsList(updatedRoomsList);
            setNewMessage(null);
        }
    },[newMessage]);

    const onCreateRoomResponseHandler = (data) => {
        if (data) {
            setSelectedRoom(data);
        }
    };

    const onUpdateRoomsForMessages = () => {
        let updatedRoomsList = [...roomsList];
        let updatedRoom = updatedRoomsList.find( (room) => room.name === selectedRoom );

        if(updatedRoom) {
            const updatedMessages = updatedRoom.messages;
            setMessages(updatedMessages);
        }
    }

    const onAllRoomsListResponseHandler = (data) => {
        onUpdateRoomsList(data);
        console.log('ALL - ROOMS - RESPONSE', data);
    };

    const onUpdateRoomsList = (roomsList) => {
        const updateRoomsList = roomsList.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRoomsList(updateRoomsList);
    };

    const onNewMessageResponseHandler = (data) => {
        setNewMessage(data);
    };

    const onCreateUserNameHandler = (userName) => {
        setUserName(userName);
        localStorage.setItem('username', userName);
    };

    const onCreateRoomHandler = (roomName) => {
        socket.emit(EVENTS.CREATE_ROOM, { roomName, userName });
        onSelectRoomHandler(roomName);
    };

    const onSelectRoomHandler = (roomName) => {
        if (roomName) {
            setSelectedRoom(roomName);
            socket.emit(EVENTS.ROOM_SELECTED, roomName);
        }
    };

    const onSendMessageHandler = (message) => {
        if (!userName || !selectedRoom || roomsList.length === 0) {
            return;
        }

        socket.emit(EVENTS.NEW_MESSAGE, {
            author: userName,
            message,
            room: selectedRoom
        });

        setMessages((currentsMessages) => [
            ...currentsMessages,
            { author: userName, message }
        ]);
    };

    return (
        <>
            <ChatContainer
                userName={userName}
                selectedRoom={selectedRoom}
                roomsList={roomsList}
                messages={messages}
                onCreateRoomHandler={onCreateRoomHandler}
                onCreateUserNameHandler={onCreateUserNameHandler}
                onSelectRoomHandler={onSelectRoomHandler}
                onSendMessageHandler={onSendMessageHandler}
            />
        </>
    );
}
