// import React, { useState } from 'react';
import './App.css';
// import ObservationForm from './ObservationForm';
// import GeneratedDetails from './GeneratedDetails';
// import SignUp from './Components/SignUp Page/SignUp';
import { Outlet } from 'react-router-dom';

function App() {
    // const [details, setDetails] = useState(null);
    // const handleDetailsGenerated = (data) => {
    //     console.log('Received data from backend:', data);
    //     setDetails(data);
    // };
    return (
        <div className="container">
            {/* <h1>Safety Audit Observation</h1>
            <ObservationForm onDetailsGenerated={handleDetailsGenerated} />
            {details && <GeneratedDetails details={details} />} */}

            <Outlet/>
        </div>
    );
}

export default App;
