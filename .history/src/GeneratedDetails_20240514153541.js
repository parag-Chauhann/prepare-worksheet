import React from 'react';

const GeneratedDetails = ({ details }) => {
    return (
        <div className="generated-details">
            <h2>Generated Details</h2>
            <p>Observation: {details.observation}</p>
            <p>Element: {details.element}</p>
            <p>Element: {details.element}</p>
            <p>Recommendation: {details.Recommendation}</p>
        </div>
    );
};

export default GeneratedDetails;
