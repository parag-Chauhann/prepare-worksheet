import React from 'react';

const GeneratedDetails = ({ details }) => {
  return (
    <tr className="generated-details">
      <td>{details.observation}</td>
      <td>{details.element}</td>
      <td>
        <ul>
          <li>{details.legalStandard_Name}: {details.legalStandard_sectionNumber}</li>
        </ul>
      </td>
      <td>{details.professionalRecommendation}</td>
      <td>{details.riskLevel}</td>
      <td>{details.riskRating}</td>
    </tr>
  );
};

export default GeneratedDetails;
