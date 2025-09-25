import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export default function LearningProgress({ progressData = {}, onSelectCategory }) {
    const categories = ['Programming', 'Math', 'Computer Science']; // Updated to Computer Science
    const colors = ['#21cff3', '#ffe066', '#ff5252'];

    const data = {
        labels: categories,
        datasets: [
            {
                data: categories.map(cat => progressData[cat] || 0),
                backgroundColor: colors,
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: '70%',
        plugins: {
            legend: { display: false }, // hide default legend
            tooltip: {
                enabled: true,
                backgroundColor: '#23253c',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                cornerRadius: 6,
            },
        },
        maintainAspectRatio: false,
        responsive: true,
        onClick: (evt, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                if (onSelectCategory) onSelectCategory(categories[index]);
            }
        },
    };

    return (
        <div
            className="card learning-progress"
            style={{ height: '280px', display: 'flex', flexDirection: 'column' }}
        >
            <h2 style={{ marginBottom: '1rem' }}>Your Learning Progress</h2>
            <div style={{ flexGrow: 1, position: 'relative' }}>
                <Doughnut data={data} options={options} />
            </div>
            <div
                className="legend"
                style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2.2rem',
                    fontSize: '1rem',
                    cursor: 'pointer',
                }}
            >
                {categories.map((cat, idx) => (
                    <span key={cat} onClick={() => onSelectCategory && onSelectCategory(cat)}>
            <span
                className="legend-dot"
                style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: colors[idx],
                    marginRight: '6px',
                }}
            />
                        {cat}
          </span>
                ))}
            </div>
        </div>
    );
}
