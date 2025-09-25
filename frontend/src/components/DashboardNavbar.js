import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DashboardNavbar({ onProfileClick }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine the currently active nav button based on the URL path
    const getActiveButton = () => {
        if (location.pathname.startsWith('/student/courses')) return 'Courses';
        if (location.pathname.startsWith('/student/assessment')) return 'Assessment';
        if (location.pathname.startsWith('/student/analytics')) return 'Analytics';
        if (location.pathname.startsWith('/student-dashboard')) return 'Dashboard';
        return '';
    };

    const active = getActiveButton();

    return (
        <nav className="dashboard-navbar" role="navigation" aria-label="Main Navigation">
            <span className="brand">AdaptiveLearn</span>
            <div className="nav-links">
                <button
                    className={active === 'Dashboard' ? 'active' : ''}
                    aria-current={active === 'Dashboard' ? 'page' : undefined}
                    onClick={() => navigate('/student-dashboard')}
                >
                    Dashboard
                </button>
                <button
                    className={active === 'Assessment' ? 'active' : ''}
                    aria-current={active === 'Assessment' ? 'page' : undefined}
                    onClick={() => navigate('/student/assessment')}
                >
                    Assessment
                </button>
                <button
                    className={active === 'Courses' ? 'active' : ''}
                    aria-current={active === 'Courses' ? 'page' : undefined}
                    onClick={() => navigate('/student/courses')}
                >
                    Courses
                </button>
                <button
                    className={active === 'Analytics' ? 'active' : ''}
                    aria-current={active === 'Analytics' ? 'page' : undefined}
                    onClick={() => navigate('/student/analytics')}
                >
                    Analytics
                </button>
                <button onClick={onProfileClick} aria-label="Open Profile">
                    Profile
                </button>
            </div>
        </nav>
    );
}
