import axios from 'axios';
import React, { useState } from 'react';

const ObservationForm = ({ onDetailsGenerated }) => {
    const [observation, setObservation] = useState('');

    const handleChange = (event) => {
        setObservation(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Sending observation to backend:', observation);
        try {
            // const response = await axios.post('http://localhost:5000/chatgpt', { observation });

            const response = await axios.post('https://backend-worksheet-generator.onrender.com/chatgpt', { observation });
            lo

            const finalData = JSON.parse(response.data.response);

            console.log('Received response from backend:', finalData);
            onDetailsGenerated(finalData);
        } catch (error) {
            if (error.response) {
                console.error('Error response from server:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
    };

    return (
        <div>
            <h2>Enter Observation</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="4"
                    cols="50"
                    placeholder="Enter observation..."
                    value={observation}
                    onChange={handleChange}
                ></textarea>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ObservationForm;
