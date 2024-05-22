import React, { useState } from 'react';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../FireBase/firebase';
import ErrorModal from './ErrorModel/ErrorModel'; 
import './Home.css';

const ObservationForm = ({ onDetailsGenerated }) => {
  const [observation, setObservation] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false); // State to control the visibility of the error modal
  const [errorMessage, setErrorMessage] = useState(''); // State to hold the error message
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
    setLoading(true);
    try {
      const response = await axios.post('https://backend-worksheet-generator.onrender.com/chatgpt', { 
        observation,
        recommendation 
      });

      let responseData = response.data.response;
      console.log('Raw response data from server:', responseData);

      let finalData;
      if (typeof responseData === 'string') {
        try {
          finalData = JSON.parse(responseData);
        } catch (error) {
          console.error('Failed to parse JSON response from server:', error);
          console.error('Response data causing the error:', responseData);
          finalData = undefined;
        }
      } else {
        finalData = responseData;
      }

      if (!finalData || Object.keys(finalData).length === 0) {
        throw new Error("We're experiencing issues processing your request. Please try again");
      }

      console.log('Received response from backend:', finalData);
      onDetailsGenerated(finalData);
      setObservation('');
      setRecommendation('');
    } catch (error) {
      console.error('Error occurred while submitting:', error);
      setErrorMessage(error.message);
      setShowError(true); // Show the error modal
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/login");
  };

  const handleCloseErrorModal = () => {
    setShowError(false);
  };

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
        <button type="submit" disabled={loading}>Submit</button>
      </form>
      {loading && <div className="loader">Loading...</div>}
      <ErrorModal show={showError} handleClose={handleCloseErrorModal} message={errorMessage} />
    </div>
  );
};

export default ObservationForm;
