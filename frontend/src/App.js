import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';
import HodDashboard from './components/HodDashboard';
import CoursesPage from './components/CoursesPage';
import AssessmentPage from './components/AssessmentPage';
import AssessmentStepOne from './components/AssessmentStepOne';
import CommunicationQuestions from './components/CommunicationQuestions';  // <-- updated import
import Analytics from './components/Analytics';
import StudentLayout from './components/StudentLayout';
import CourseDetail from './components/CourseDetail';
import AssistantContainer from './components/AssistantContainer';
import AssistantLogoButton from './components/AssistantLogoButton';

function AppWrapper() {
    const location = useLocation();

    const [auth, setAuth] = useState({
        token: null,
        refreshToken: null,
        role: null,
    });

    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const role = localStorage.getItem('role');
        if (token && role) {
            setAuth({ token, refreshToken, role });
        }
    }, []);

    const hideVoiceChat =
        location.pathname === '/' ||
        location.pathname === '/register' ||
        (location.pathname.startsWith('/student/assessment/') && location.pathname !== '/student/assessment');

    const assistantNameByRole = {
        STUDENT: 'Nova',
        PROFESSOR: 'ProfessorBot',
        HOD: 'HeadBot',
        null: 'Assistant',
    };
    const assistantName = assistantNameByRole[auth.role] || 'Assistant';

    return (
        <>
            {!hideVoiceChat && (
                <>
                    {!isAssistantOpen && (
                        <AssistantLogoButton
                            onClick={() => setIsAssistantOpen(true)}
                            assistantName={assistantName}
                        />
                    )}
                    {isAssistantOpen && (
                        <AssistantContainer
                            assistantName={assistantName}
                            onClose={() => setIsAssistantOpen(false)}
                        />
                    )}
                </>
            )}

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
                <Route path="/hod-dashboard" element={<HodDashboard />} />

                <Route element={<StudentLayout />}>
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/student/courses" element={<CoursesPage />} />
                    <Route path="/student/courses/:courseId" element={<CourseDetail />} />
                    <Route path="/student/assessment" element={<AssessmentPage />} />
                    {/* Updated route */}
                    <Route path="/student/assessment/interview-preparation" element={<CommunicationQuestions />} />
                    <Route path="/student/assessment/test" element={<AssessmentStepOne />} />
                    <Route path="/student/analytics" element={<Analytics />} />
                </Route>
            </Routes>
        </>
    );
}

export default function App() {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
}
