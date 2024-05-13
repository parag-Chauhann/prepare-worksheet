import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ObservationForm from './ObservationForm';
import GeneratedDetails from './GeneratedDetails';

function App() {
    const [details, setDetails] = useState(null);

    const handleDetailsGenerated = (data) => {
        setDetails(data);
    };

    return (
        <div className="container">
            <h1>Safety Audit Observation</h1>
            <ObservationForm onDetailsGenerated={handleDetailsGenerated} />
            {details && <GeneratedDetails details={details} />}
        </div>
    );
}

export default App;
