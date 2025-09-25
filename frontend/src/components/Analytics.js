import React from 'react';
import QuickActions from './QuickActions'; // Import QuickActions component

export default function Analytics() {
    return (
        <div className="analytics-container" style={{ padding: '20px', color: 'white', fontFamily: 'Arial, sans-serif' }}>

            {/* Placeholder: Insert charts components or visualization here */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Example: Weekly Study Progress chart */}
                <div style={{ background: '#23253c', padding: '1rem', borderRadius: '8px', flex: '1 1 300px' }}>
                    <h4>Weekly Study Progress</h4>
                    {/* Chart goes here */}
                </div>

                {/* Example: Subject Progress chart */}
                <div style={{ background: '#23253c', padding: '1rem', borderRadius: '8px', flex: '1 1 300px' }}>
                    <h4>Subject Progress</h4>
                    {/* Chart goes here */}
                </div>

                {/* Example: Daily Study Time chart */}
                <div style={{ background: '#23253c', padding: '1rem', borderRadius: '8px', flex: '1 1 300px' }}>
                    <h4>Daily Study Time</h4>
                    {/* Chart goes here */}
                </div>
            </div>

            {/* Achievements Section */}
            <div style={{ backgroundColor: '#1e1e2f', padding: 20, width: 320, borderRadius: 8, marginTop: 20 }}>
                <h3 style={{ color: '#9a88ff', marginBottom: 15 }}>Achievements</h3>

                <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 24, marginRight: 12 }}>🏆</span>
                    <div>
                        <strong>First Course</strong><br />
                        <small>Completed your first course</small>
                    </div>
                </div>

                <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 24, marginRight: 12 }}>⚡</span>
                    <div>
                        <strong>Fast Learner</strong><br />
                        <small>Completed 3 courses in one month</small>
                    </div>
                </div>

                <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 24, marginRight: 12 }}>🎯</span>
                    <div>
                        <strong>Consistent</strong><br />
                        <small>Studied every day for a week</small>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 24, marginRight: 12 }}>📈</span>
                    <div>
                        <strong>Improved</strong><br />
                        <small>Improved test scores by 20%</small>
                    </div>
                </div>
            </div>

            {/* Quick Actions section (Practice Quiz, etc) */}
            <div style={{ marginTop: '2rem' }}>
                <QuickActions />
            </div>

        </div>
    );
}
