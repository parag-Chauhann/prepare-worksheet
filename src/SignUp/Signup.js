import React, { useState } from 'react';
import './SignUp.css';
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [formData, setFormData] = useState({
    // username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      setEmailError(''); // Clear any previous email error
    } else {
      setPasswordMatchError(false);
      setEmailError(''); // Clear any previous email error

      const emailValue = formData.email;
      const passwordValue = formData.password;

      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then(data => {
          
          navigate("/");
        })
        .catch(error => {
          // Handle error (e.g., display error message to the user)
          console.error(error);
          if (error.code === 'auth/email-already-in-use') {
            setEmailError('Email is already in use. Please use a different email.');
          }
        });
    }
  };

  return (
    <div>
    <div className='signup'>
    <div>
    <Link to='/'>
          <img
            alt='login-logo'
            src='https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg'
            className='login-logo'
          />
    </Link>

    </div>
    <div className="signup-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        {/* <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        /> */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>

        <p>
            By continuing, you agree to <Link to='/terms&condition'>Amazon's Conditions</Link> of Use and{' '}
            <Link to='/terms&condition'>Privacy Notice</Link>.
          </p>

        {passwordMatchError && (
          <p className="error-message">Passwords do not match!</p>
        )}

        {emailError && (
          <p className="error-message">{emailError}</p>
        )}
      </form>
    </div>
    </div>
    </div>
  );
};

export default SignUp;
