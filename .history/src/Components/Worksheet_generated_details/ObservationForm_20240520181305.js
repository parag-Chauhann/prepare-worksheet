import React, { useState } from 'react';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../FireBase/firebase';
import { useNavigate } from 'react-router-dom';

const ObservationForm = ({ onDetailsGenerated }) => {
  const [observation, setObservation] = useState('');
  const [recommendation, setRecommendation] = useState(''); // New state for recommendation
  const navigate = useNavigate();

  const handleChangeObservation = (event) => {
    setObservation(event.target.value);
  };

  const handleChangeRecommendation = (event) => {
    setRecommendation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Sending observation to backend:', observation);
    try {
      // const response = await axios.post('http://localhost:5000/chatgpt', { 
        // observation,
        recommendation // Include recommendation in the request body
      });
      
      const response = await axios.post('https://backend-worksheet-generator.onrender.com/chatgpt', { 
        observation,
        recommendation // Include recommendation in the request body
      });

      // Retrieve response data
      let responseData = response.data.response;
      console.log('Raw response data from server:', responseData);

      // Parse JSON if needed
      let finalData;
      try {
        finalData = JSON.parse(responseData);
      } catch (error) {
        console.error('Failed to parse JSON response from server:', error);
        // If parsing fails, assume the response is already in object format
        finalData = responseData;
      }

      console.log('Received response from backend:', finalData);
      onDetailsGenerated(finalData);
      setObservation(''); // Clear the form input
      setRecommendation(''); // Clear the recommendation input
    } catch (error) {
      if (error.response) {
        console.error('Error response from the server:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/login");
  }

  return (
    <div className="form-container">
      <button onClick={handleLogout}>Logout</button>
      <h2>Enter Observation</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          placeholder="Enter observation..."
          value={observation}
          onChange={handleChangeObservation}
        ></textarea>
        <br />
        <input
          type="text"
          placeholder="Enter any additional professional recommendations (optional)..."
          value={recommendation}
          onChange={handleChangeRecommendation}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ObservationForm;
