import React from 'react';

export default function CurrentLearningPath() {
    const modules = [
        { name: 'Java Basics', hours: 20, completed: true },
        { name: 'OOP Concepts', hours: 25, completed: true },
        { name: 'Spring Framework', hours: 30, completed: false },
        { name: 'Database Integration', hours: 25, completed: false },
        { name: 'Web Development', hours: 20, completed: false },
    ];

    const completionPercentage = 45;

    return (
        <div className="card current-learning-path">
            <h2>Current Learning Path</h2>
            <div className="path-desc" style={{ marginBottom: 8 }}>
                Java Developer Track<br />
                Complete path to becoming a Java developer
            </div>
            <div className="progress-text" style={{ fontWeight: 'bold', marginBottom: 6 }}>
                {completionPercentage}% Complete
            </div>
            <div className="progress-bar-container" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={completionPercentage}>
                <div className="progress-bar" style={{ width: `${completionPercentage}%` }} />
            </div>
            <ul className="path-list" style={{ marginTop: '16px' }}>
                {modules.map((module) => (
                    <li key={module.name} className={module.completed ? 'completed' : ''} >
                        <span>{module.name}</span>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
              <span className="hours">{module.hours}h</span>
                            {module.completed && <span className="checkmark">&#10003;</span>}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
