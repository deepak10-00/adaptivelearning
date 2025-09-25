import React from 'react';
import VoiceAssistant from './VoiceAssistant';

export default function AssistantContainer({ assistantName, onClose }) {
    return (
        <div
            className="assistant-container"
            style={{
                position: 'fixed',
                bottom: 32,
                right: 32,
                zIndex: 1000,
                width: 350,
                maxHeight: '80vh',
                background: 'linear-gradient(135deg,#232c36 60%,#354284 100%)',
                borderRadius: 18,
                boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.37)',
                color: '#f9f9f9',
                fontFamily: 'Inter, Arial, sans-serif',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                overflowY: 'auto',
                transition: 'none !important',
            }}
        >
            {/* Minimize / Close button */}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    cursor: 'pointer',
                    color: '#36e1f6',
                    fontWeight: 'bold',
                    fontSize: 16,
                    lineHeight: 1,
                }}
                aria-label="Minimize assistant"
                title="Minimize assistant"
            >
                ▼
            </button>

            <div
                style={{
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                    marginBottom: '6px',
                    textAlign: 'center',
                }}
            >
                {assistantName ? `${assistantName} Assistant` : 'Assistant'}
            </div>
            <VoiceAssistant assistantName={assistantName} />
        </div>
    );
}
