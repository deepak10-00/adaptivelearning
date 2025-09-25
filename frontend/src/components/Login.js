import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
    const [role, setRole] = useState('STUDENT');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const normalizedEmail = email.trim().toLowerCase();

            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: normalizedEmail, password, role }),
            });

            if (!response.ok) {
                throw new Error('Login failed, please check your credentials');
            }

            const data = await response.json();

            console.log('Login success. Role:', data.role);
            console.log('Profile data:', data.profileData);

            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userEmail', data.profileData?.email || normalizedEmail);

            // Optionally store profileData as string if you want
            if (data.profileData) {
                localStorage.setItem('profileData', JSON.stringify(data.profileData));
            }

            // Navigate to role-specific dashboard page
            navigate(`/${data.role.toLowerCase()}-dashboard`, {
                state: { profileData: data.profileData }
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const roles = ['STUDENT', 'PROFESSOR', 'HOD'];

    return (
        <div className="login-bg">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>

                <div className="login-roles" role="tablist">
                    {roles.map((r) => (
                        <button
                            key={r}
                            className={role === r ? 'role-btn active' : 'role-btn'}
                            onClick={() => setRole(r)}
                            type="button"
                            role="tab"
                            aria-selected={role === r}
                            aria-controls={`${r.toLowerCase()}-tabpanel`}
                            tabIndex={role === r ? 0 : -1}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <input
                    type="email"
                    placeholder="Email Address"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                />

                <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="login-input password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-label="Password"
                    />
                    <button
                        type="button"
                        className="eye-icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                fill="none"
                                stroke="#b8aaff"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
                                <path
                                    d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.83-2.12M9.91 5.07a9 9 0 019.02 7.45c.07.21.07.45 0 .66a9.06 9.06 0 01-1.39 2.43M5.07 9.91a9 9 0 00.34 8.03c.09.14.18.27.28.4a8.97 8.97 0 009.02-7.45"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                fill="none"
                                stroke="#b8aaff"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>
                </div>

                <button className="login-btn" onClick={handleLogin} type="button">
                    Login
                </button>

                <p className="register-link">
                    Don’t have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}
