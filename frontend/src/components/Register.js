import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for routing
import './login.css';  // Reuse the same CSS for consistent style

export default function Register() {
    const [role, setRole] = useState('STUDENT');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hodCode, setHodCode] = useState(null);
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const endpoint =
                role === 'HOD' ? 'http://localhost:8080/register/hod' : 'http://localhost:8080/auth/register';

            // For HOD, send via HOD registration API which returns the unique 3-digit code
            const payload = { name, mobile, email, password, role };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Registration failed, please try again');
            }

            const data = await response.json();
            console.log('Registration successful:', data);

            if (role === 'HOD' && data.code) {
                setHodCode(data.code);
                setMessage(`Registration successful! Your unique HOD code is: ${data.code}`);
            } else {
                setMessage('Registration successful! You can now log in.');
            }

            // Optionally redirect:
            // window.location.href = '/';

        } catch (error) {
            alert(error.message);
        }
    };

    const roles = ['STUDENT', 'PROFESSOR', 'HOD'];

    return (
        <div className="login-bg">
            <div className="login-card">
                <h2 className="login-title">Create Account</h2>
                <div className="login-roles">
                    {roles.map(r => (
                        <button
                            key={r}
                            className={role === r ? 'role-btn active' : 'role-btn'}
                            onClick={() => setRole(r)}
                            type="button"
                        >
                            {r}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="login-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="login-input"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    className="login-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="login-input"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <button className="login-btn" onClick={handleRegister} type="button">Register</button>

                {hodCode && <p className="hod-code-message">Your Unique HOD Code: <strong>{hodCode}</strong></p>}
                {message && <p className="registration-message">{message}</p>}

                <p className="register-link">
                    Already have an account? <Link to="/">Login here</Link>
                </p>
            </div>
        </div>
    );
}
