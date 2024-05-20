import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './SignUp.css';
import { db, auth } from '../FireBase/firebase';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name,
        email
      });

      // Automatically log in the user after account creation
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to protected route or home page
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className='main'>
      <div className='signup'>
        <div className='signup-container'>
          <h1>Sign Up</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSignUp}>
            <h5>Name</h5>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type='text'
              placeholder='Enter your name'
            />
            <h5>E-mail</h5>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type='email'
              placeholder='Enter your E-mail Id here...'
            />
            <h5>Password</h5>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type='password'
              placeholder='Enter your password here...'
            />
            <h5>Confirm Password</h5>
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type='password'
              placeholder='Confirm your password'
            />
            <button className='signup-signin-btn' type='submit'>
              Sign Up
            </button>
          </form>

          <Link to="/login">
            <button className='signup-login-btn'>
              Already have an account? Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
