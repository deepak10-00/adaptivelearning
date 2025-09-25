import React, { useState } from 'react';
import ProfessorNavbar from './ProfessorNavbar';
import ProfessorProfileDrawer from './ProfessorProfileDrawer';

export default function ProfessorDashboard() {
    const subject = "Mathematics";
    const studentCount = 30;

    const [profileOpen, setProfileOpen] = useState(false);

    const handleProfileClick = () => {
        setProfileOpen(true);
    };

    return (
        <div style={{
            background: "#181a23",
            minHeight: "100vh",
            color: "#fff",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: "2rem",
            maxWidth: "1000px",
            margin: "0 auto"
        }}>
            <ProfessorNavbar onProfileClick={handleProfileClick} />

            <ProfessorProfileDrawer
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                token={localStorage.getItem('token')}
            />

            {/* Rest of dashboard content */}
            <header style={{ marginBottom: "2rem" }}>
                <h1>Welcome, Professor!</h1>
                <p>Subject: <strong>{subject}</strong></p>
                <p>Number of Students: <strong>{studentCount}</strong></p>
            </header>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Performance Analytics</h2>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                    <div style={{ background: "#23253c", borderRadius: "1rem", flex: "1 1 300px", padding: "1rem" }}>
                        <h3>Quiz Scores</h3>
                        <p>Chart placeholder here</p>
                    </div>
                    <div style={{ background: "#23253c", borderRadius: "1rem", flex: "1 1 300px", padding: "1rem" }}>
                        <h3>Time Spent</h3>
                        <p>Chart placeholder here</p>
                    </div>
                    <div style={{ background: "#23253c", borderRadius: "1rem", flex: "1 1 300px", padding: "1rem" }}>
                        <h3>Typing Behavior</h3>
                        <p>Chart placeholder here</p>
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Doubt Clarification Chat</h2>
                <div style={{ background: "#23253c", borderRadius: "1rem", height: "300px", padding: "1rem", overflowY: "auto" }}>
                    <p>Chat portal placeholder</p>
                </div>
            </section>

            <section>
                <button style={{
                    background: "#27e6ea",
                    border: "none",
                    padding: "1rem 2rem",
                    borderRadius: "1.5rem",
                    color: "#23253c",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
                        onClick={() => alert("Download report feature coming soon")}>
                    Download / Export Reports
                </button>
            </section>
        </div>
    );
}
