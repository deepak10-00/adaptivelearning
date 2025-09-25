import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AssessmentSection() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'stretch',
                padding: '2rem',
            }}
        >
            {/* Interview Preparation Box */}
            <div
                style={{
                    background: '#232c47',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    padding: '2rem',
                    width: '340px',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <h3 style={{ color: '#21cff3', marginBottom: '1rem' }}>Interview Preparation</h3>
                <p style={{ color: '#b8eafd', marginBottom: '2rem' }}>
                    Practice frequently asked coding questions and get ready for your technical interviews.
                </p>
                <button
                    style={{
                        background: '#21cff3',
                        color: '#13223b',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.6rem 1.4rem',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        console.log('Start Preparation clicked');
                        navigate('/student/assessment/interview-preparation');
                    }}
                >
                    Start Preparation
                </button>
            </div>

            {/* Assessment Test Box */}
            <div
                style={{
                    background: '#232c47',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    padding: '2rem',
                    width: '340px',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <h3 style={{ color: '#a285f7', marginBottom: '1rem' }}>Assessment Test</h3>
                <p style={{ color: '#b8eafd', marginBottom: '2rem' }}>
                    Take an assessment test to evaluate your knowledge and track your learning progress.
                </p>
                <button
                    style={{
                        background: '#a285f7',
                        color: '#23253b',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.6rem 1.4rem',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        console.log('Start Assessment clicked');
                        navigate('/student/assessment/test');
                    }}
                >
                    Start Assessment
                </button>
            </div>
        </div>
    );
}
