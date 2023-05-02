import React from 'react';

export default function Room({name, createdAt, isRoomSelected, onSelectRoomHandler}) {
    let activeRoomClasses = ['active', 'text-white'];

    if(!isRoomSelected) {
        activeRoomClasses = ['bg-white'];
    }

    return (
        <div className={`list-group-item list-group-item-action rounded-0 my-2 ${activeRoomClasses.join(' ')}`}
        onClick={() => onSelectRoomHandler(name)}>
            <div className="ml-4">
                <div className="d-flex align-item-center justify-content-between mb-1">
                    <h6 className="mb-0">{name}</h6>
                    <small className="small font-weight-bold">1 Apr</small>
                </div>
            </div>
        </div>
    );
}
