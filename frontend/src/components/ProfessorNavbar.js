import React from 'react';
import './ProfessorNavbar.css';

import { useNavigate, useLocation } from 'react-router-dom';

export default function ProfessorNavbar({ onProfileClick }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine the currently active nav button based on the URL path
    const getActiveButton = () => {
        if (location.pathname.startsWith('/professor/students')) return 'Students';
        if (location.pathname.startsWith('/professor-dashboard')) return 'Dashboard';
        return '';
    };

    const active = getActiveButton();

    return (
        <nav className="professor-navbar" role="navigation" aria-label="Main Navigation">
            <span className="brand">AdaptiveLearn</span>
            <div className="nav-links">
                <button
                    className={active === 'Dashboard' ? 'active' : ''}
                    aria-current={active === 'Dashboard' ? 'page' : undefined}
                    onClick={() => navigate('/professor-dashboard')}
                >
                    Dashboard
                </button>
                <button
                    className={active === 'Students' ? 'active' : ''}
                    aria-current={active === 'Students' ? 'page' : undefined}
                    onClick={() => navigate('/professor/students')}
                >
                    Students
                </button>
                <button onClick={onProfileClick} aria-label="Open Profile">
                    Profile
                </button>
            </div>
        </nav>
    );
}
