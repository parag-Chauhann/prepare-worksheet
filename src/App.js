import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <div className="Appcontainer">
            <Outlet />
        </div>
    );
}

export default App;
