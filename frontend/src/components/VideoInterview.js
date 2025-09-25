import React, { useRef, useState } from "react";

const VideoInterview = () => {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [uploading, setUploading] = useState(false);

    // Start recording from webcam
    const startRecording = async () => {
        setVideoBlob(null);
        setTranscription("");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;

        mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: "video/webm",
        });

        const chunks = [];
        mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
        };
        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            setVideoBlob(blob);
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    // Stop recording
    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    // Upload video and request transcription
    const uploadAndTranscribe = async () => {
        if (!videoBlob) return alert("Record a video first!");

        setUploading(true);
        const formData = new FormData();
        formData.append("video", videoBlob, "interview.webm");

        try {
            // Upload video
            const uploadRes = await fetch("http://localhost:5000/upload-video", {
                method: "POST",
                body: formData,
            });
            const uploadData = await uploadRes.json();
            if (!uploadRes.ok) throw new Error(uploadData.message || "Upload failed");

            // Request transcription
            const transcribeRes = await fetch("http://localhost:5000/transcribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: uploadData.file }),
            });
            const transcribeData = await transcribeRes.json();
            if (!transcribeRes.ok) throw new Error(transcribeData.message || "Transcription failed");

            setTranscription(transcribeData.transcription);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2>Video Interview Preparation</h2>
            <video ref={videoRef} autoPlay muted style={{ width: "400px", height: "300px", border: "1px solid #ccc" }} />
            <div>
                {!recording && <button onClick={startRecording}>Start Recording</button>}
                {recording && <button onClick={stopRecording}>Stop Recording</button>}
                <button onClick={uploadAndTranscribe} disabled={uploading || recording}>
                    {uploading ? "Uploading & Transcribing..." : "Submit & Get Transcription"}
                </button>
            </div>
            {transcription && (
                <div>
                    <h3>Transcription Result:</h3>
                    <p>{transcription}</p>
                </div>
            )}
        </div>
    );
};

export default VideoInterview;
