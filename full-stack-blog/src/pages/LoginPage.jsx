import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import './Login.scss';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        try {
            await signInWithEmailAndPassword(
                getAuth(),
                email,
                password
            );
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    };
    return (
        <div className="LoginPage">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />
            <div className="apply">
                <button onClick={login}>Log In</button>
                <Link to={'/createAccount'}>
                    Create Account
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
