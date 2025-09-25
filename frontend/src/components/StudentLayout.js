import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import ProfileDrawer from './ProfileDrawer';

export default function StudentLayout() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();

    const handleEnrollCourse = (course) => {
        if (!enrolledCourses.find(c => c.id === course.id)) {
            setEnrolledCourses([...enrolledCourses, course]);
        }
    };

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
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch profile');
                return res.json();
            })
            .then(data => {
                setProfile(data);
            })
            .catch(err => {
                console.error('Error fetching profile:', err);
            });
    }, [navigate]);

    return (
        <>
            <DashboardNavbar onProfileClick={() => setDrawerOpen(true)} />
            <Outlet context={{ enrolledCourses, handleEnrollCourse }} />
            {drawerOpen && profile && (
                <ProfileDrawer
                    user={profile}
                    onClose={() => setDrawerOpen(false)}
                />
            )}
        </>
    );
}
