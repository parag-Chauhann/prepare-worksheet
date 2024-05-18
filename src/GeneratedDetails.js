import React from 'react';

const GeneratedDetails = ({ details }) => {
    return (
        <div className="generated-details">
            <h2>Generated Details</h2>
            <p>Observation: {details.observation}</p>
            <p>
                Element: {details.element}
            </p>
            <p>
                Legal Standards: 
                <ul>
                    <li>{details.legalStandard_Name}: {details.legalStandard_sectionNumber}</li>
                </ul>
            </p>
            <p>Professional Recommendation: {details.professionalRecommendation}</p>
            <p>Risk Level: {details.riskLevel}</p>
            <p>Risk Rating: {details.riskRating}</p>
        </div>
    );
};

export default GeneratedDetails;
