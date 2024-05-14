import React from 'react';

const GeneratedDetails = ({ details }) => {
    return (
        <div className="generated-details">
            <h2>Generated Details</h2>
            <p>Observation: {details.observation}</p>
            <p>Element: {details.element}</p>
            <p>Standard: {details.standard}</p>
            <p>Recommendation: {details.Recommendation}</p>
            <p>Risk Level: {details.risk_level}</p>

        </div>
    );
};

export default GeneratedDetails;