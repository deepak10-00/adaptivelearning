import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import LearningProgress from './LearningProgress';
import CurrentLearningPath from './CurrentLearningPath';
import ProfileDrawer from './ProfileDrawer';
import './Dashboard.css';

export default function StudentDashboard() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const { enrolledCourses } = useOutletContext();

    useEffect(() => {
        const storedRecs = sessionStorage.getItem('assessmentRecommendations');
        if (storedRecs) setRecommendations(JSON.parse(storedRecs));
    }, []);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const token = localStorage.getItem('token');

        if (!email || !token) {
            navigate('/login');
            return;
        }

        fetch(`http://localhost:8080/auth/user/details?email=${email}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch profile');
                return res.json();
            })
            .then((data) => setProfile(data))
            .catch((err) => console.error('Error fetching profile:', err));
    }, [navigate]);

    const categoryProgress = enrolledCourses.reduce((acc, course) => {
        acc[course.category] = (acc[course.category] || 0) + 1;
        return acc;
    }, {});

    const handleStartLearning = (course) => {
        navigate(`/student/courses/${course.id}`);
    };

    return (
        <>
            <div className="dashboard-content">
                <LearningProgress progressData={categoryProgress} />

                {recommendations ? (
                    <div className="current-learning-path-box">
                        <h2>Assessment Recommendations</h2>
                        <ul style={{ paddingLeft: '1.2rem' }}>
                            {recommendations.map((rec, idx) => (
                                <li key={idx} style={{ marginBottom: '0.5rem', color: '#f9f9f9' }}>
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <CurrentLearningPath />
                )}
            </div>

            <div style={{ padding: '1.5rem 3rem' }}>
                <h2 style={{ color: '#7b68ee', marginBottom: '1.5rem' }}>Enrolled Courses</h2>
                {enrolledCourses.length === 0 ? (
                    <p style={{ color: '#ccc' }}>You have not enrolled in any courses yet.</p>
                ) : (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
                            gap: '1.5rem',
                        }}
                    >
                        {enrolledCourses.map((course) => (
                            <div
                                key={course.id}
                                style={{
                                    background: '#1e273a',
                                    borderRadius: '10px',
                                    padding: '1.5rem',
                                    color: 'white',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <h3 style={{ fontWeight: 'bold', color: '#a285f7', marginBottom: '0.5rem' }}>
                                    {course.title}
                                </h3>
                                <p style={{ fontStyle: 'italic', marginBottom: '0.7rem', color: '#c6c6f7' }}>
                                    {course.description}
                                </p>
                                <div style={{ fontSize: '0.9rem', color: '#9a95e5', marginBottom: 'auto' }}>
                                    {course.category}
                                </div>
                                <button
                                    style={{
                                        marginTop: '1rem',
                                        background: '#21cff3',
                                        color: '#23253c',
                                        border: 'none',
                                        borderRadius: '6px',
                                        padding: '0.5rem 1.2rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleStartLearning(course)}
                                >
                                    Start Learning
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Only show ProfileDrawer when profile is loaded */}
            {drawerOpen && profile && (
                <ProfileDrawer onClose={() => setDrawerOpen(false)} user={profile} />
            )}
        </>
    );
}
