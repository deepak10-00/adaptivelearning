import React, { useState, useEffect } from 'react';

export default function VoiceAssistant({ assistantName: initialName }) {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [assistantName, setAssistantName] = useState(initialName || 'Nova');

    useEffect(() => {
        setAssistantName(initialName || 'Nova');
    }, [initialName]);

    // Keyboard shortcut Ctrl+M to toggle listening
    useEffect(() => {
        const keyHandler = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'm') {
                e.preventDefault();
                toggleListening();
            }
        };
        window.addEventListener('keydown', keyHandler);
        return () => window.removeEventListener('keydown', keyHandler);
    }, []);

    const toggleListening = () => {
        setListening((prev) => !prev);
    };

    const handleAsk = () => {
        setListening(false);
        const fakeAnswer = `Hi! You asked: "${transcript}". Here's the answer from ${assistantName}.`;
        setResponse(fakeAnswer);
        setTranscript('');
    };

    return (
        <div
            style={{
                position: 'relative',
                borderRadius: 16,
                boxShadow: '0 4px 32px rgba(44,189,206,0.12)',
                background: 'linear-gradient(135deg,#232c36 60%,#354284 100%)',
                padding: '28px 24px',
                width: '100%',
                color: '#fff',
                fontFamily: 'Inter, Arial, sans-serif',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                <div
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg,#36e1f6 60%,#b9aaff 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginRight: 14,
                    }}
                >
                    {assistantName[0] || 'A'}
                </div>
                <div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>{assistantName} Assistant</div>
                    <input
                        type="text"
                        value={assistantName}
                        onChange={(e) => setAssistantName(e.target.value)}
                        placeholder="Name your assistant"
                        style={{
                            marginTop: 8,
                            padding: '4px 12px',
                            borderRadius: 8,
                            border: 'none',
                            fontSize: '1rem',
                        }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: 18 }}>
                <input
                    type="text"
                    placeholder="Ask a question..."
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 8,
                        border: 'none',
                        fontSize: '1rem',
                        marginBottom: 10,
                    }}
                />
                <div style={{ display: 'flex', gap: 10 }}>
                    <button
                        type="button"
                        onClick={toggleListening}
                        style={{
                            flex: 1,
                            padding: '12px 0',
                            borderRadius: 12,
                            background: listening ? '#ff4d4f' : '#36e1f6',
                            color: '#222c36',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            border: 'none',
                            boxShadow: '0 2px 8px rgba(44,189,206,0.18)',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                    >
                        {listening ? 'Stop Listening' : 'Start Listening'}
                    </button>
                    <button
                        type="button"
                        onClick={handleAsk}
                        disabled={!transcript.trim()}
                        style={{
                            flex: 1,
                            padding: '12px 0',
                            borderRadius: 12,
                            background: '#21cff3',
                            color: '#222c36',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            border: 'none',
                            boxShadow: '0 2px 8px rgba(33,207,243,0.4)',
                            cursor: transcript.trim() ? 'pointer' : 'not-allowed',
                            opacity: transcript.trim() ? 1 : 0.6,
                            transition: 'opacity 0.3s',
                        }}
                    >
                        Ask {assistantName}
                    </button>
                </div>
            </div>

            {response && (
                <div
                    style={{
                        marginTop: 20,
                        background: '#313b53',
                        borderRadius: '16px 16px 4px 16px',
                        padding: '14px 20px',
                        fontSize: '1.08rem',
                        boxShadow: '0 2px 12px rgba(44,189,206,0.10)',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    <span style={{ color: '#36e1f6', fontWeight: 'bold', marginRight: 8 }}>{assistantName}:</span>
                    {response}
                </div>
            )}
        </div>
    );
}
