import React from 'react';

export default function AssistantLogoButton({ onClick, assistantName }) {
    return (
        <button
            onClick={onClick}
            style={{
                position: 'fixed',
                bottom: 32,
                right: 32,
                zIndex: 1300,
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#36e1f6 60%,#b9aaff 100%)',
                border: 'none',
                boxShadow: '0 4px 16px rgba(44,189,206,0.21)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
            }}
            aria-label="Open assistant"
            title="Open assistant"
        >
      <span
          style={{
              color: '#232c36',
              fontSize: '2rem',
              fontWeight: 'bold',
              fontFamily: 'Inter, Arial, sans-serif',
          }}
      >
        {assistantName ? assistantName[0] : 'A'}
      </span>
        </button>
    );
}
