import React, { useEffect, useState } from 'react';

export default function InterviewPreparation() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInterviewQuestions() {
            setLoading(true);
            try {
                const response = await fetch(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [
                                {
                                    parts: [
                                        {
                                            text:
                                                "Generate 10 commonly asked interview coding questions with brief answers. Structure response as JSON: [{question, answer}]",
                                        },
                                    ],
                                },
                            ],
                        }),
                    }
                );

                const data = await response.json();
                let parsedQuestions = [];

                if (
                    data &&
                    data.candidates &&
                    data.candidates.length &&
                    data.candidates[0].content &&
                    data.candidates[0].content.parts &&
                    data.candidates[0].content.parts.length
                ) {
                    try {
                        parsedQuestions = JSON.parse(data.candidates[0].content.parts[0].text);
                    } catch {
                        parsedQuestions = [];
                    }
                }

                setQuestions(parsedQuestions);
            } catch (err) {
                setQuestions([]);
            } finally {
                setLoading(false);
            }
        }

        fetchInterviewQuestions();
    }, []);

    if (loading) return <div style={{ color: '#21cff3', textAlign: 'center', marginTop: '2rem' }}>Loading questions...</div>;
    if (!questions.length) return <div style={{ color: '#ff5252', textAlign: 'center', marginTop: '2rem' }}>No questions found.</div>;

    return (
        <div style={{ padding: '1.5rem 3rem', color: '#fff', backgroundColor: '#181b23', minHeight: '100vh' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Interview Preparation</h2>
            {questions.map((item, index) => (
                <div
                    key={index}
                    style={{
                        background: '#232c47',
                        padding: '1rem 1.5rem',
                        marginBottom: '1rem',
                        borderRadius: '10px',
                    }}
                >
                    <strong>Q{index + 1}: {item.question}</strong>
                    <p style={{ marginTop: '0.5rem', color: '#b8eafd' }}>{item.answer}</p>
                </div>
            ))}
        </div>
    );
}
