import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase/firebase";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setError(""); // Clear previous errors when user types in email
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        setError(""); // Clear previous errors when user types in password
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/");
        } catch (error) {
            setError("Invalid email or password."); // Set error message for incorrect login details
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder='Your email'
                    required
                    value={email}
                    onChange={handleChangeEmail}
                />
                <input
                    type="password"
                    placeholder='Your Password'
                    value={password}
                    onChange={handleChangePassword}
                />
                <button type='submit'>Login</button>
            </form>
            <p>Need to Signup? <Link to="/signup">Create Account</Link></p>
        </div>
    );
}

export default Login;
