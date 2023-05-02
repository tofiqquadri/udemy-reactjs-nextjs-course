import React from 'react';
import Room from './Room/Room';
import styles from './RoomContainer.module.css';

export default function RoomContainer({ roomsList, selectedRoom, onSelectRoomHandler }) {

    return (
        <div>
            <div className="bg-gray px-4 py-2">
                <span className="h5 mb-0 py-1">Rooms</span>
            </div>

            <div className={styles.RoomBoxContainer}>
                <div className="list-group rounded-0 px-2">
                    {roomsList.map((room, roomIndex) => (
                        <Room
                            key={roomIndex}
                            name={room.name}
                            isRoomSelected={room.name === selectedRoom}
                            createdAt={room.createdAt}
                            onSelectRoomHandler={onSelectRoomHandler}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
