import React from 'react';

export default function QuickActions() {
    return (
        <div className="card quick-actions">
            <h2>Quick Actions</h2>
            <div>
                <strong>Practice Quiz</strong><br />
                <span className="desc">Test your knowledge</span>
            </div>
            <button className="practice-btn" type="button" style={{ marginTop: '1rem' }}>
                Practice Quiz
            </button>
        </div>
    );
}
