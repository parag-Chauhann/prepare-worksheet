import axios from 'axios';
import { ref } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { imageDB } from '../FireBase/firebase';
import ErrorModal from './ErrorModel/ErrorModel';
import './Home.css';
import './ObservationForm.css';

const ObservationForm = ({ onDetailsGenerated }) => {
  const [observation, setObservation] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [setImg] = useState("");

  const observationRef = useRef(null);
  const recommendationRef = useRef(null);

  useEffect(() => {
    const handleInput = (ref) => {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    };

    const obsRef = observationRef.current;
    const recRef = recommendationRef.current;

    const handleObservationInput = () => handleInput(observationRef);
    const handleRecommendationInput = () => handleInput(recommendationRef);

    obsRef.addEventListener('input', handleObservationInput);
    recRef.addEventListener('input', handleRecommendationInput);

    return () => {
      obsRef.removeEventListener('input', handleObservationInput);
      recRef.removeEventListener('input', handleRecommendationInput);
    };
  }, []);

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

    ref(imageDB, 'files/')

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
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseErrorModal = () => {
    setShowError(false);
  };

  return (
    
    <div className="form-container">
      <h2 style={{ color: 'white' }}>Enter Observation</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <textarea
            ref={observationRef}
            value={observation}
            onChange={handleChangeObservation}
            onClick={(e) => e.target.classList.add('clicked')}
            onBlur={(e) => { if (!e.target.value) e.target.classList.remove('clicked'); }}
            required
            rows="1"
            style={{ overflow: 'hidden' }}
          />
          <label>Observation</label>
        </div>
        <br />
        <div className='input-group'>
          <textarea
            ref={recommendationRef}
            value={recommendation}
            onChange={handleChangeRecommendation}
            onClick={(e) => e.target.classList.add('clicked')}
            onBlur={(e) => { if (!e.target.value) e.target.classList.remove('clicked'); }}
            rows="1"
            style={{ overflow: 'hidden' }}
          />
          <label>Additional Recommendations (optional)</label>
        </div>
        <br />

        <div>
          <input type="file" accept=".png, .jpg, .jpeg, image/*" onChange={(e) => setImg(e.target.files[0])} />
        </div>
        <button type="submit" className="button-19" disabled={loading}>Submit</button>
      </form>
      {loading && <div className="loader">Loading...</div>}
      <ErrorModal show={showError} handleClose={handleCloseErrorModal} message={errorMessage} />
    </div>
  );
};

export default ObservationForm;