import React from 'react';
import styles from './DataViewer.module.css';

export default function DataViewer({
    csvData,
    onDeleteCSVRowHandler,
    onEditCSVRowHandler,
    editingRowIndex,
    editingRowData,
    onEditRowDataInputHandler,
    onCancleEditingRowHandler,
    onSaveEditingRowDataHandler
}) {
    let tableBody = null;

    if (csvData) {
        tableBody = csvData.map((row, rowIndex) => {
            if (editingRowIndex === rowIndex) {
                return (
                    <tr key={rowIndex}>
                        <td>{rowIndex + 1}.</td>
                        <td>
                            <input type="text" value={editingRowData.firstName} onChange={onEditRowDataInputHandler} />
                        </td>
                        <td>
                            <span>{row.lastName}</span>
                        </td>
                        <td>
                            <span>{row.email}</span>
                        </td>
                        <td>
                            <span>{row.phoneNumber}</span>
                        </td>
                        <td>
                            <span>{row.title}</span>
                        </td>
                        <td>
                            <span>{row.occupation}</span>
                        </td>
                        <td>
                            <button onClick={onCancleEditingRowHandler} >Cancel</button>
                            <button onClick={onSaveEditingRowDataHandler}>Save</button>
                        </td>
                    </tr>
                );
            }

            return (
                <tr key={rowIndex}>
                    <td>{rowIndex + 1}.</td>
                    <td>
                        <span>{row.firstName}</span>
                    </td>
                    <td>
                        <span>{row.lastName}</span>
                    </td>
                    <td>
                        <span>{row.email}</span>
                    </td>
                    <td>
                        <span>{row.phoneNumber}</span>
                    </td>
                    <td>
                        <span>{row.title}</span>
                    </td>
                    <td>
                        <span>{row.occupation}</span>
                    </td>
                    <td>
                        <button onClick={() => onDeleteCSVRowHandler(rowIndex)}>
                            Delete
                        </button>
                        <button onClick={() => onEditCSVRowHandler(rowIndex)}>
                            Edit
                        </button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className={styles.Container}>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Title</th>
                        <th>Occupation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{tableBody}</tbody>
            </table>
        </div>
    );
}
