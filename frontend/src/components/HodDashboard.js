import React from 'react';
import HODNavbar from './HODNavbar'; // Adjust path if needed

export default function HodDashboard({ userId }) {
    // Dashboard dummy data
    const coursesCount = 12;
    const professorsCount = 8;
    const studentsCount = 120;

    const doubts = [
        { id: 1, student: 'Student A', doubt: 'Question about OOP', professor: 'Prof. X', status: 'Answered' },
        { id: 2, student: 'Student B', doubt: 'Database query issue', professor: 'Prof. Y', status: 'Pending' },
    ];

    const aiInsights = [
        "Increase participation in assessments",
        "Improve response time to student doubts",
        "Focus on upgrading course content in Java",
    ];

    let profileData = {};
    try {
        profileData = JSON.parse(localStorage.getItem('profileData'));
    } catch (e) {}

    const hodName = profileData?.user?.name || "HOD";
    const hodCode = profileData?.code || "---";  // Show --- if code missing

    return (
        <div style={{
            background: "#181a23",
            minHeight: "100vh",
            color: "#fff",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: "2rem",
            maxWidth: "1100px",
            margin: "0 auto"
        }}>
            <HODNavbar />

            <header style={{ marginBottom: "1rem" }}>
                <h1>{hodName}</h1>
                <p>HOD Code: <strong>{hodCode}</strong></p>
                <p>Primary Admin Overview</p>
            </header>

            <section style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ flex: 1, background: "#23253c", padding: "1.5rem", borderRadius: "1rem", textAlign: "center" }}>
                    <h2>{coursesCount}</h2>
                    <p>Courses</p>
                </div>
                <div style={{ flex: 1, background: "#23253c", padding: "1.5rem", borderRadius: "1rem", textAlign: "center" }}>
                    <h2>{professorsCount}</h2>
                    <p>Professors</p>
                </div>
                <div style={{ flex: 1, background: "#23253c", padding: "1.5rem", borderRadius: "1rem", textAlign: "center" }}>
                    <h2>{studentsCount}</h2>
                    <p>Students</p>
                </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Student Performance Summary</h2>
                <div style={{ background: "#23253c", borderRadius: "1rem", padding: "1rem" }}>
                    <p>Performance charts and tables will be here</p>
                </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Doubts and Responses</h2>
                <div style={{ background: "#23253c", borderRadius: "1rem", padding: "1rem" }}>
                    <table style={{ width: "100%", color: "white", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ borderBottom: "1px solid #444" }}>
                            <th style={{ padding: "0.5rem" }}>Student</th>
                            <th style={{ padding: "0.5rem" }}>Doubt</th>
                            <th style={{ padding: "0.5rem" }}>Professor</th>
                            <th style={{ padding: "0.5rem" }}>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {doubts.map(d => (
                            <tr key={d.id} style={{ borderBottom: "1px solid #333" }}>
                                <td style={{ padding: "0.5rem" }}>{d.student}</td>
                                <td style={{ padding: "0.5rem" }}>{d.doubt}</td>
                                <td style={{ padding: "0.5rem" }}>{d.professor}</td>
                                <td style={{ padding: "0.5rem" }}>{d.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Manage Professors</h2>
                <button style={{
                    background: "#27e6ea", border: "none", padding: "1rem 2rem",
                    borderRadius: "1.5rem", color: "#23253c", cursor: "pointer", fontWeight: "bold"
                }} onClick={() => alert('Assign unique codes feature coming soon')}>
                    Generate & Assign Unique Codes
                </button>
                <button style={{
                    background: "#27e6ea", border: "none", padding: "1rem 2rem",
                    borderRadius: "1.5rem", color: "#23253c", cursor: "pointer", fontWeight: "bold", marginLeft: "1rem"
                }} onClick={() => alert('Approve/manage professors feature coming soon')}>
                    Approve / Manage Professors
                </button>
            </section>

            <section>
                <h2>AI System Insights</h2>
                <div style={{ background: "#23253c", borderRadius: "1rem", padding: "1rem" }}>
                    <ul>
                        {aiInsights.map((insight, index) => (
                            <li key={index} style={{ marginBottom: "0.5rem" }}>{insight}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
