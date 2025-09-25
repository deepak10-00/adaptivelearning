import React from 'react';

export default function ProfessorProfile({ professor }) {
    // Provide dummy data if none available
    const dummyProfessor = {
        profileImage: 'https://via.placeholder.com/100',
        name: 'John Doe',
        email: 'john.doe@example.com',
        mobileNumber: '123-456-7890',
    };

    const prof = professor || dummyProfessor;

    return (
        <div style={{
            background: "#23253c",
            padding: "2rem",
            borderRadius: "1rem",
            color: "#fff",
            maxWidth: "600px",
            margin: "2rem auto",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}>
            <h2 style={{ marginBottom: "1rem" }}>Professor Profile</h2>
            {/* Profile Image */}
            <div style={{ marginBottom: "1rem" }}>
                <img
                    src={prof.profileImage}
                    alt={`${prof.name}'s profile`}
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #27e6ea'
                    }}
                />
            </div>

            <p><strong>Name:</strong> {prof.name}</p>
            <p><strong>Email:</strong> {prof.email}</p>
            <p><strong>Mobile Number:</strong> {prof.mobileNumber}</p>
        </div>
    );
}
