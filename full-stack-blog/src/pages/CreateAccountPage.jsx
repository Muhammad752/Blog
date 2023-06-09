import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    getAuth,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import './CreateAccountPage.scss';

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmpassword] =
        useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password !== confirmPassword) {
                setError("Passwords didn't match");
                return;
            }
            await createUserWithEmailAndPassword(
                getAuth(),
                email,
                password
            );
            navigate('/articles');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="registerPage">
            <h1>Create new account</h1>
            {error && <p className="error">{error}</p>}
            <input
                autoComplete="off"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />
            <input
                placeholder="Repeat Password"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                    setConfirmpassword(e.target.value)
                }
            />
            <div className="apply">
                <button onClick={createAccount}>
                    Create account
                </button>
                <Link to={'/login'}>Login</Link>
            </div>
        </div>
    );
};

export default CreateAccountPage;
