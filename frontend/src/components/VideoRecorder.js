import React, { useRef, useState } from "react";

const VideoRecorder = () => {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const startRecording = async () => {
        setRecordedChunks([]);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;

        mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: "video/webm",
        });

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) setRecordedChunks((prev) => [...prev, event.data]);
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            setVideoURL(url);
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        setRecording(false);
    };

    return (
        <div>
            <video ref={videoRef} autoPlay muted style={{ width: "400px", height: "300px" }} />
            <div>
                {!recording && <button onClick={startRecording}>Start Recording</button>}
                {recording && <button onClick={stopRecording}>Stop Recording</button>}
            </div>
            {videoURL && (
                <div>
                    <h3>Recorded Video:</h3>
                    <video src={videoURL} controls style={{ width: "400px", height: "300px" }} />
                    <a href={videoURL} download="recorded_interview.webm">Download Video</a>
                </div>
            )}
        </div>
    );
};

export default VideoRecorder;
