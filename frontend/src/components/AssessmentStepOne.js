import React, { useState, useEffect } from 'react';

const styles = {
    container: {
        maxWidth: 600,
        margin: '40px auto',
        padding: 30,
        backgroundColor: '#181c24',
        borderRadius: 15,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        color: '#f9f9f9',
        fontFamily: "'Inter', Arial, sans-serif",
    },
    progressBarContainer: {
        height: 6,
        width: '100%',
        backgroundColor: '#37505a',
        borderRadius: 3,
        marginBottom: 20,
        overflow: 'hidden',
    },
    progressBar: (progressPercent) => ({
        height: '100%',
        width: `${progressPercent}%`,
        backgroundColor: '#12c2e9',
        transition: 'width 0.3s ease-in-out',
    }),
    questionNumber: {
        marginBottom: 12,
        fontWeight: 'bold',
    },
    questionText: {
        fontSize: '1.3rem',
        marginBottom: 24,
    },
    optionRow: (selected) => ({
        backgroundColor: selected ? '#12c2e9' : '#222c3c',
        borderRadius: 6,
        padding: '14px 16px',
        marginBottom: 12,
        cursor: 'pointer',
        color: selected ? '#fff' : '#eee',
        border: selected ? '2px solid #32dedb' : '2px solid transparent',
        fontWeight: selected ? 'bold' : 'normal',
        transition: 'all 0.2s',
        userSelect: 'none',
    }),
    navButtons: {
        marginTop: 30,
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: (disabled) => ({
        padding: '10px 26px',
        borderRadius: 8,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: disabled ? '#37505a' : '#12c2e9',
        color: disabled ? '#8fa2b3' : '#191b21',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'background-color 0.2s',
    }),
    loading: {
        fontSize: '1.2rem',
        textAlign: 'center',
        marginTop: 50,
        color: '#ccc',
    },
    noQuestions: {
        fontSize: '1.2rem',
        textAlign: 'center',
        marginTop: 50,
        color: '#ccc',
    },
    recommendationsContainer: {
        maxWidth: 600,
        margin: '40px auto',
        padding: 30,
        backgroundColor: '#222c3c',
        borderRadius: 15,
        color: '#f9f9f9',
        fontFamily: "'Inter', Arial, sans-serif",
    },
    recommendationItem: {
        marginBottom: 10,
    },
};

const AssessmentStepOne = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);

    // State to track submission and recommendations
    const [submitted, setSubmitted] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('/api/gemini/generate-questions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        count: 15,
                        topics: [
                            'Programming concepts',
                            'Data structures',
                            'Algorithms',
                            'Operating systems',
                            'Networking',
                            'Databases',
                            'Software engineering',
                            'Theory of computation',
                            'Engineering mathematics',
                        ],
                    }),
                });

                const data = await response.json();
                setQuestions(Array.isArray(data.questions) ? data.questions : []);
                setAnswers(new Array(data.questions?.length || 0).fill(null));
            } catch (error) {
                console.error('Failed to fetch questions:', error);
                setQuestions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    // Generate subject based recommendations and overall score
    function generateSubjectRecommendationsAndScore(userAnswers, questions) {
        const topicStats = {};
        let totalCorrect = 0;
        const totalQuestions = questions.length;

        userAnswers.forEach((answer, idx) => {
            const question = questions[idx];
            if (!question) return;
            const topic = question.topic || 'General';

            if (!topicStats[topic]) {
                topicStats[topic] = { correct: 0, total: 0 };
            }
            topicStats[topic].total += 1;

            if (answer === question.correctAnswer) {
                topicStats[topic].correct += 1;
                totalCorrect += 1;
            }
        });

        const overallScore = ((totalCorrect / totalQuestions) * 100).toFixed(0);

        // Build recommendations
        const recommendations = [];
        recommendations.push(`Overall Score: ${totalCorrect} / ${totalQuestions} (${overallScore}%)`);

        Object.entries(topicStats).forEach(([topic, stats]) => {
            const topicPercent = ((stats.correct / stats.total) * 100).toFixed(0);
            if (stats.correct < stats.total) {
                recommendations.push(`${topic}: ${stats.correct} / ${stats.total} correct (${topicPercent}%)`);
            }
        });

        if (recommendations.length === 1) {
            recommendations.push('Excellent! You mastered all subjects.');
        }

        return recommendations;
    }

    const onNext = () => {
        if (selectedOption === null) return;
        const updatedAnswers = [...answers];
        updatedAnswers[currentIndex] = selectedOption;
        setAnswers(updatedAnswers);
        setSelectedOption(null);
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const onPrevious = () => {
        setSelectedOption(null);
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const onSubmit = () => {
        if (selectedOption === null) return;
        const updatedAnswers = [...answers];
        updatedAnswers[currentIndex] = selectedOption;
        setAnswers(updatedAnswers);

        const recs = generateSubjectRecommendationsAndScore(updatedAnswers, questions);

        setRecommendations(recs);
        setSubmitted(true);

        sessionStorage.setItem('assessmentRecommendations', JSON.stringify(recs));
    };

    if (loading)
        return <div style={styles.loading}>Loading assessment questions...</div>;

    if (!questions.length)
        return <div style={styles.noQuestions}>No questions available.</div>;

    if (submitted)
        return (
            <div style={styles.recommendationsContainer}>
                <h2>Assessment Recommendations</h2>
                <ul>
                    {recommendations.map((rec, idx) => (
                        <li key={idx} style={styles.recommendationItem}>
                            {rec}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => (window.location.href = '/student-dashboard')}
                    style={{
                        marginTop: '1.5rem',
                        background: '#21cff3',
                        color: '#222c3c',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.7rem 1.5rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '1rem',
                    }}
                >
                    View Full Dashboard
                </button>
            </div>
        );

    const currentQuestion = questions[currentIndex];
    const progressPercent = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div style={styles.container}>
            <div style={styles.progressBarContainer}>
                <div style={styles.progressBar(progressPercent)} />
            </div>

            <div style={styles.questionNumber}>
                Question {currentIndex + 1} of {questions.length}
            </div>

            <div style={styles.questionText}>{currentQuestion.question}</div>

            {currentQuestion.options.map((option, idx) => (
                <div
                    key={idx}
                    style={styles.optionRow(selectedOption === option)}
                    onClick={() => setSelectedOption(option)}
                >
                    {option}
                </div>
            ))}

            <div style={styles.navButtons}>
                <button
                    onClick={onPrevious}
                    disabled={currentIndex === 0}
                    style={styles.button(currentIndex === 0)}
                >
                    Previous
                </button>

                {currentIndex === questions.length - 1 ? (
                    <button
                        onClick={onSubmit}
                        disabled={selectedOption === null}
                        style={styles.button(selectedOption === null)}
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        onClick={onNext}
                        disabled={selectedOption === null}
                        style={styles.button(selectedOption === null)}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default AssessmentStepOne;
