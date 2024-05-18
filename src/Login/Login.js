import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();




  const handleSignIn = (e) => {
    e.preventDefault();
    const emailValue = e.target.elements.email.value;
    const passwordValue = e.target.elements.password.value;

    signInWithEmailAndPassword(auth,emailValue,passwordValue).then(data => {
      console.log(data)
      navigate("/home");
    }).catch(err => {
      alert(err.code)
    })
  };
  return (
    <div className='main'>
      <div className='login'>
        <Link to='/'>
          <img
            alt='login-logo'
            src='https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg'
            className='login-logo'
          />
        </Link>

        <div className='login-container'>
          <h1>Sign In</h1>


          <form onSubmit={(e)=>handleSignIn(e)}>
            <h5>E-mail</h5>
            <input
              value={email}
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              type='email'
              placeholder='Enter your E-mail Id here...'
            />
            <h5>Password</h5>
            <input
              value={password}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              type='password'
              placeholder='Enter your password here...'
            />
            <button className='login-signin-btn' type='submit'>
              Sign In
            </button>
          </form>

          <p>
            By continuing, you agree to <Link to='/terms&condition'>Amazon's Conditions</Link> of Use and{' '}
            <Link to='/terms&condition'>Privacy Notice</Link>.
          </p>
          <Link to="/signup">
          <button className='login-register-btn' type='submit'  >
            Sign Up
          </button>
          
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
