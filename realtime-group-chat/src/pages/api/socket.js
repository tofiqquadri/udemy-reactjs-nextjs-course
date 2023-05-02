import { Server } from 'socket.io';
import { LISTENERS as EVENTS, EVENTS as LISTENERS } from 'src/Shared/Constants';

let ROOMS_LIST = [];
let ONLINE_USERS = {};

const onCreateRoomHandler = (data, socket) => {
    if (ROOMS_LIST.indexOf((room) => room.name === data.roomName) === -1) {
        ROOMS_LIST.push({
            name: data.roomName,
            userName: data.userName,
            messages: [],
            createdAt: new Date()
        });
    }
    ONLINE_USERS[socket.id].emit(EVENTS.CREATE_ROOM_RESPONSE, data.roomName);
    socket.broadcast.emit(EVENTS.ALL_ROOMS_LIST_RESPONSE, ROOMS_LIST);
};

const onNewMessageHandler = (data, socket) => {
    const { author, message, room } = data;
    if (!room) {
        return;
    }

    let updatedRoom = ROOMS_LIST.find((data) => data.name === room);
    updatedRoom.messages.push({ author, message, createdAt: new Date() });

    if(updatedRoom) {
        socket.broadcast.emit(EVENTS.NEW_MESSAGE_RESPONSE, updatedRoom);
    }
};

const onRoomSelected = (roomName, socket) => {
    if(!roomName){
        return;
    }
    
    let room = ROOMS_LIST.find((data) => data.name === roomName);
    ONLINE_USERS[socket.id].emit(EVENTS.NEW_MESSAGE_RESPONSE, room);
};

export default function ServerHandler(req, res) {
    if (res.socket.server.io) {
        console.log('Socket is already running');
    } else {
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('Socket is connected');

            const isUserExists = ONLINE_USERS[socket.id];
            if (!isUserExists) {
                ONLINE_USERS[socket.id] = socket;
            }

            socket.emit(EVENTS.ALL_ROOMS_LIST_RESPONSE, ROOMS_LIST);
            socket.on(LISTENERS.CREATE_ROOM, (data) =>
                onCreateRoomHandler(data, socket)
            );
            socket.on(LISTENERS.NEW_MESSAGE, (data) =>
                onNewMessageHandler(data, socket)
            );
            socket.on(LISTENERS.ROOM_SELECTED, (data) =>
                onRoomSelected(data, socket)
            );

            socket.on('disconnect', (reason) => {
                delete ONLINE_USERS[socket.id];
            })
        });
    }
    res.end();
}
