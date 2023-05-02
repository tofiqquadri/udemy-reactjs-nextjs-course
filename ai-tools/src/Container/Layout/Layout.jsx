import React from 'react';
import Header from '../Header/Header';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <div className="container mt-5">{children}</div>
        </>
    );
}
