import React from 'react';

const GeneratedDetails = ({ details }) => {
    return (
        <div className="generated-details">
            <h2>Generated Details</h2>
            <p>Observation: {details.Observation}</p>
            <p>Element: {details.Element}</p>
            <p>Standard: {details['Relevant Standards']}</p>
            <p>Recommendation: {details.Recommendation}</p>
            <p>Risk Level: {details['Risk Level']}</p>
        </div>
    );
};

export default GeneratedDetails;
