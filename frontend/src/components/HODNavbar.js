import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function HODNavbar({ onProfileClick }) {
    const navigate = useNavigate();
    const location = useLocation();

    const getActiveButton = () => {
        if (location.pathname.startsWith('/hod-dashboard')) return 'Dashboard';
        if (location.pathname.startsWith('/hod/professors')) return 'Professors';
        return '';
    };

    const active = getActiveButton();

    return (
        <nav className="hod-navbar" role="navigation" aria-label="Main Navigation" style={navStyle}>
            <span className="brand" style={brandStyle}>AdaptiveLearn</span>
            <div className="nav-links" style={linksContainerStyle}>
                <button
                    className={active === 'Dashboard' ? 'active' : ''}
                    aria-current={active === 'Dashboard' ? 'page' : undefined}
                    onClick={() => navigate('/hod-dashboard')}
                    style={buttonStyle(active === 'Dashboard')}
                >
                    Dashboard
                </button>
                <button
                    className={active === 'Professors' ? 'active' : ''}
                    aria-current={active === 'Professors' ? 'page' : undefined}
                    onClick={() => navigate('/hod/professors')}
                    style={buttonStyle(active === 'Professors')}
                >
                    Professors
                </button>
            </div>
        </nav>
    );
}

const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',  // Brand left, buttons right
    backgroundColor: '#23253c',
    padding: '1rem 2rem',
    borderRadius: '1rem',
    marginBottom: '2rem',
};

const brandStyle = {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#27e6ea',
};

const linksContainerStyle = {
    display: 'flex',
    alignItems: 'center',
};

const buttonStyle = (active) => ({
    background: active ? '#27e6ea' : 'none',
    border: active ? 'none' : '1.5px solid #27e6ea',
    color: active ? '#23253c' : '#ccc',
    fontSize: '1rem',
    marginLeft: '1.5rem',
    padding: '0.5rem 1.2rem',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
});
