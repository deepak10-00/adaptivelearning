import React, { useEffect, useState } from 'react';
import ProfessorProfile from './ProfessorProfile';

export default function ProfessorProfileDrawer({ isOpen, onClose, token }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isOpen) {
            setProfile(null);
            setError(null);
            return;
        }

        async function fetchProfile() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8080/professors/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to load profile: ${response.status}`);
                }
                const data = await response.json();
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [isOpen, token]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        }}>
            <div style={{
                background: '#23253c',
                borderRadius: '1rem',
                padding: '2rem',
                width: '300px',
                color: '#fff',
                position: 'relative',
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        border: 'none',
                        background: 'transparent',
                        color: '#27e6ea',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                    }}
                    aria-label="Close profile drawer"
                >
                    &times;
                </button>

                {loading && <p>Loading profile...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {profile && <ProfessorProfile professor={profile} />}
            </div>
        </div>
    );
}
