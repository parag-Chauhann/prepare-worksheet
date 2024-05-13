import React, { useState } from 'react';
import axios from 'axios';

const ObservationForm = ({ onDetailsGenerated }) => {
    const [observation, setObservation] = useState('');

    const handleChange = (event) => {
        setObservation(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submit button clicked');
        try {
            const response = await axios.post('http://localhost:5000/chatgpt', { observation });
            const resJSON = JSON.parse(response.data.gpt)
            console.log(resJSON, typeof(resJSON));
            onDetailsGenerated(resJSON);
        } catch (error) {
            console.error('Error:', error);
            // Handle error
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
