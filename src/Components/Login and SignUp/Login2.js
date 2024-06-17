import React, { useState } from 'react';
import './Login.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../FireBase/firebase';
import { useNavigate } from 'react-router-dom';
import image1 from '../Images/undraw_engineering_team_a7n2.svg';
import image2 from '../Images/undraw_qa_engineers_dg-5-p.svg';

function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [isLogin, setIsLogin] = useState(true);
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
                email,
                companyName
            });
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (e) {
            setError(e.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (error) {
            setError("Invalid email or password.");
            console.error(error);
        }
    };

    return (
        <div className={`container ${!isLogin ? 'sign-up-mode' : ''}`}>
            <div className="gradient-background"></div>
            <div className='forms-container'>
                <div className='signin-signup'>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className='sign-in-form'>
                        <h2 className='title'>Sign in</h2>
                        <div className='input-field'>
                            <img alt='' src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"/>
                            <input
                                type='email'
                                placeholder='Enter Your Email...'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='input-field'>
                            <img alt='' src="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/password-256.png"/>
                            <input
                                type='password'
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <input type='submit' value="Login" className='btn solid' />
                    </form>

                    {/* Signup Form */}
                    <form onSubmit={handleSignUp} className='sign-up-form'>
                        <h2 className='title'>Sign up</h2>
                        <div className='input-field'>
                            <img alt='' src="https://cdn0.iconfinder.com/data/icons/map-location-solid-style/91/Map_-_Location_Solid_Style_09-256.png"/>
                            <input
                                type='text'
                                placeholder='Enter Your Company Name'
                                required
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                        <div className='input-field'>
                            <img alt='' src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"/>
                            <input
                                type='text'
                                placeholder='Enter Your Name...'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='input-field'>
                            <img alt='' src="https://cdn0.iconfinder.com/data/icons/social-circle-3/72/Email-256.png"/>
                            <input
                                type='email'
                                placeholder='Enter Your official Email...'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='input-field'>
                            <img alt='' src="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/password-256.png"/>
                            <input
                                type='password'
                                placeholder='Enter Password...'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='input-field'>
                            <img alt='' src="https://cdn4.iconfinder.com/data/icons/protection-and-security-3/24/_confirm_lock-256.png"/>
                            <input
                                type='password'
                                placeholder='Confirm Password...'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <input type='submit' value="Sign Up" className='btn solid' />
                    </form>
                </div>
            </div>

            {/* Panels Container */}
            <div className='panels-container'>
                <div className={`panel left-panel ${isLogin ? '' : 'sign-up-mode'}`}>
                    <div className="content">
                        <h3>New Here?</h3>
                        <p>Ready to elevate your safety standards? Sign up to start recording your safety observations, accessing professional analysis, and ensuring compliance with legal standards.</p>
                        <button className="btn transparent" onClick={() => setIsLogin(false)}>Sign Up</button>
                    </div>
                    <img src={image1} className="image" alt="Sign Up" />
                </div>
                <div className={`panel right-panel ${isLogin ? '' : 'sign-up-mode'}`}>
                    <div className="content">
                        <h3>One of us?</h3>
                        <p>Welcome back! Sign in to review past observations, access professional analysis reports, and stay up-to-date with safety compliance recommendations.</p>
                        <button className="btn transparent" onClick={() => setIsLogin(true)}>Sign In</button>
                    </div>
                    <img src={image2} className="image" alt="Sign In" />
                </div>
            </div>
        </div>
    );
}

export default Login;
