import React, { useEffect, useRef, useState, useCallback } from "react";

const communicationQuestions = [
    "Tell me about yourself.",
    "What are your strengths?",
    "What are your weaknesses?",
    "Why do you want this job?",
    "Describe a challenging situation and how you handled it.",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?",
    "How do you deal with stress and pressure?",
    "Describe a time you worked as part of a team.",
    "What motivates you?",
];

const QUESTION_TIME = 60; // seconds per question

const CommunicationQuestions = () => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chunks, setChunks] = useState([]);

    useEffect(() => {
        const startStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
            } catch (err) {
                console.error("Error accessing media devices.", err);
            }
        };
        startStream();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const handleNext = useCallback(() => {
        if (currentQuestionIndex < communicationQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(QUESTION_TIME);
            setChunks([]);
        }
    }, [currentQuestionIndex]);

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setTimeLeft(QUESTION_TIME);
            setChunks([]);
        }
    };

    // Memoized stopRecordingAndUpload to satisfy hook dependencies
    const stopRecordingAndUpload = useCallback(async () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();

            mediaRecorderRef.current.onstop = async () => {
                setLoading(true);
                const blob = new Blob(chunks, { type: 'video/webm' });
                try {
                    const formData = new FormData();
                    formData.append('media', blob, 'recording.webm');

                    const response = await fetch('/api/upload', { method: 'POST', body: formData });

                    if (!response.ok) {
                        throw new Error(`Upload failed: ${response.statusText}`);
                    }

                    const data = await response.json();
                    setFeedback(data.feedback || null);
                } catch (error) {
                    console.error('Upload error:', error);
                    setFeedback([{ questionIndex: 0, feedback: 'Failed to get feedback' }]);
                } finally {
                    setLoading(false);
                }
            };
        }
    }, [chunks]);

    // Timer countdown effect with stopRecordingAndUpload dependency
    useEffect(() => {
        if (loading) return;
        if (timeLeft === 0) {
            stopRecordingAndUpload();
            handleNext();
            return;
        }
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, loading, handleNext, stopRecordingAndUpload]);

    // Recording controls
    const startRecording = () => {
        setChunks([]);
        const options = { mimeType: 'video/webm; codecs=vp8,opus' };
        let stream = streamRef.current;
        if (!stream) {
            console.error("No media stream available.");
            return;
        }
        let mediaRecorder;
        try {
            mediaRecorder = new MediaRecorder(stream, options);
        } catch (e) {
            console.error('Exception while creating MediaRecorder:', e);
            return;
        }
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                setChunks(prev => [...prev, e.data]);
            }
        };
        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setLoading(true);
        setTimeLeft(QUESTION_TIME);  // reset timer
    };

    // Manual submit triggers stop recording & upload
    const handleSubmit = () => {
        stopRecordingAndUpload();
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "30px",
                justifyContent: "center",
                alignItems: "flex-start",
                maxWidth: "1100px",
                margin: "40px auto",
            }}
        >
            <div style={{ flex: "0 0 38%", display: "flex", justifyContent: "center" }}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    style={{
                        width: "95%",
                        border: "2px solid #1DE9B6",
                        borderRadius: "10px",
                        background: "#111"
                    }}
                />
            </div>

            <div style={{ flex: "1 1 60%" }}>
                <h2 style={{ marginBottom: 6 }}>Communication Round</h2>
                {feedback ? (
                    <div>
                        <h3>Feedback Summary</h3>
                        <ul>
                            {feedback.map((item) => (
                                <li key={item.questionIndex}>
                                    <b>Q{item.questionIndex + 1} Feedback: </b> {item.feedback}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => {
                                setFeedback(null);
                                setCurrentQuestionIndex(0);
                                setTimeLeft(QUESTION_TIME);
                                setChunks([]);
                            }}
                            style={{
                                marginTop: '20px',
                                background: "#1DE9B6",
                                color: "#22223B",
                                border: "none",
                                borderRadius: "5px",
                                padding: "7px 22px",
                                cursor: "pointer",
                            }}
                        >
                            Restart
                        </button>
                    </div>
                ) : (
                    <>
                        <h3 style={{ marginBottom: 2 }}>
                            Question {currentQuestionIndex + 1}/{communicationQuestions.length}
                        </h3>
                        <p style={{ fontSize: "18px", fontWeight: 500 }}>{communicationQuestions[currentQuestionIndex]}</p>

                        <div style={{ marginTop: "14px" }}>
                            <button
                                onClick={handlePrev}
                                disabled={currentQuestionIndex === 0 || loading}
                                style={{
                                    background: "#1DE9B6",
                                    color: "#22223B",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "7px 20px",
                                    marginRight: "10px",
                                    opacity: currentQuestionIndex === 0 || loading ? 0.5 : 1,
                                    cursor: currentQuestionIndex === 0 || loading ? "not-allowed" : "pointer"
                                }}
                            >
                                Previous
                            </button>
                            {!loading && (
                                <button
                                    onClick={startRecording}
                                    disabled={loading}
                                    style={{
                                        background: "#1DE9B6",
                                        color: "#22223B",
                                        border: "none",
                                        borderRadius: "5px",
                                        padding: "7px 20px",
                                        marginRight: "10px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Start Recording
                                </button>
                            )}
                            {loading && (
                                <button
                                    onClick={handleSubmit}
                                    style={{
                                        background: "#1DE9B6",
                                        color: "#22223B",
                                        border: "none",
                                        borderRadius: "5px",
                                        padding: "7px 22px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Stop Recording & Submit
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                disabled={currentQuestionIndex === communicationQuestions.length - 1 || loading}
                                style={{
                                    background: "#1DE9B6",
                                    color: "#22223B",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "7px 20px",
                                    marginRight: "10px",
                                    opacity: currentQuestionIndex === communicationQuestions.length - 1 || loading ? 0.5 : 1,
                                    cursor: currentQuestionIndex === communicationQuestions.length - 1 || loading ? "not-allowed" : "pointer"
                                }}
                            >
                                Next
                            </button>
                        </div>
                        <p style={{ margin: "16px 0 0 0" }}>Time left: {timeLeft} seconds</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default CommunicationQuestions;
