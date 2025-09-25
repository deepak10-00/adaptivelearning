import React, { useEffect, useState } from 'react';

export default function AssessmentPage() {
    const [questions, setQuestions] = useState([]);
    const [curIdx, setCurIdx] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchQuestions() {
            setLoading(true);
            try {
                const response = await fetch(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBPUhjXuWS87rYGIXZ_qUAahu8p9k2Iz8A', // Replace with your API key
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [
                                {
                                    parts: [
                                        {
                                            text:
                                                "Generate 6 random entry-level programming multiple-choice questions with 4 options each, clearly indicating the correct answer. Structure response in JSON: [{question, options:[...], answer}]",
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

        fetchQuestions();
    }, []);

    if (loading)
        return (
            <div style={{ color: '#21cff3', textAlign: 'center', marginTop: '2rem' }}>
                Loading questions...
            </div>
        );
    if (!questions.length)
        return (
            <div style={{ color: '#ff5252', textAlign: 'center', marginTop: '2rem' }}>
                No questions found.
            </div>
        );

    const q = questions[curIdx];

    function handleSelect(option) {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[curIdx] = option;
        setUserAnswers(updatedAnswers);
    }

    function handleNext() {
        if (curIdx < questions.length - 1) setCurIdx(curIdx + 1);
    }

    function handlePrev() {
        if (curIdx > 0) setCurIdx(curIdx - 1);
    }

    return (
        <div style={{ background: '#181b23', minHeight: '100vh', padding: 0 }}>
            <nav
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 2rem',
                    background: '#16191f',
                }}
            >
                <div style={{ color: '#21cff3', fontSize: '1.7rem', fontWeight: 'bold' }}>AdaptiveLearn</div>
                <div>
                    <button
                        style={{
                            padding: '.5rem 1.5rem',
                            background: '#21cff3',
                            color: '#181b23',
                            border: 'none',
                            borderRadius: 8,
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            marginRight: '1rem',
                        }}
                    >
                        Assessment
                    </button>
                </div>
            </nav>

            <div style={{ textAlign: 'center', color: '#fff', marginTop: '2rem' }}>
                <h2 style={{ fontWeight: 700 }}>Adaptive Skills Assessment</h2>
                <div style={{ color: '#b8eafd', fontWeight: 400 }}>
                    Let's determine your current knowledge level to personalize your learning experience.
                </div>
                <div style={{ margin: '2rem auto 1.2rem auto', width: 400, maxWidth: '90%' }}>
                    <div style={{ background: '#222631', height: 6, borderRadius: 6 }}>
                        <div
                            style={{
                                height: 6,
                                width: `${((curIdx + 1) / questions.length) * 100}%`,
                                background: '#21cff3',
                                borderRadius: 6,
                                transition: 'width 0.4s',
                            }}
                        />
                    </div>
                    <div style={{ color: '#8aadc8', fontSize: '.98rem', marginTop: '.35rem' }}>
                        Question {curIdx + 1} of {questions.length}
                    </div>
                </div>
            </div>

            <div
                style={{
                    background: '#191d28',
                    margin: '2.5rem auto',
                    borderRadius: 14,
                    color: '#fff',
                    boxShadow: '0 4px 24px 0 #111524',
                    maxWidth: 550,
                    padding: '2.5rem 2.5rem 2rem 2.5rem',
                }}
            >
                <div style={{ fontWeight: 650, fontSize: '1.3rem', marginBottom: 24, color: '#fff' }}>{q.question}</div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginBottom: '2rem',
                    }}
                >
                    {q.options.map((opt, idx) => {
                        const selected = userAnswers[curIdx] === opt;
                        return (
                            <div
                                key={idx}
                                onClick={() => handleSelect(opt)}
                                style={{
                                    background: selected ? '#143966' : '#14161e',
                                    border: `2px solid ${selected ? '#21cff3' : '#383d45'}`,
                                    color: selected ? '#21cff3' : '#fff',
                                    padding: '1rem',
                                    borderRadius: 10,
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {opt}
                            </div>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        onClick={handlePrev}
                        disabled={curIdx === 0}
                        style={{
                            background: curIdx === 0 ? '#262934' : '#232c47',
                            color: curIdx === 0 ? '#657894' : '#fff',
                            borderRadius: 6,
                            border: 'none',
                            padding: '.7rem 1.5rem',
                            fontWeight: 600,
                            cursor: curIdx === 0 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={curIdx === questions.length - 1 || userAnswers[curIdx] == null}
                        style={{
                            background: curIdx === questions.length - 1 || userAnswers[curIdx] == null ? '#262934' : '#21cff3',
                            color: curIdx === questions.length - 1 || userAnswers[curIdx] == null ? '#657894' : '#181b23',
                            borderRadius: 6,
                            border: 'none',
                            padding: '.7rem 1.5rem',
                            fontWeight: 600,
                            cursor: curIdx === questions.length - 1 || userAnswers[curIdx] == null ? 'not-allowed' : 'pointer',
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
