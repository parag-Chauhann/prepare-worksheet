import React from 'react';

const GeneratedDetails = ({ details }) => {
    return (
        <div className="generated-details">
            <h2>Generated Details</h2>
            <p>Element: {details.element}</p>
            <p>Observation: {details.Oobservation}</p>
            <p>Recommendation: {details.Recommendation}</p>
        </div>
    );
};

export default GeneratedDetails;
