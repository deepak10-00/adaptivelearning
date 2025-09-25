import React, { useRef, useState, useEffect } from 'react';

function VideoRecorder({ onFeedback }) {
    const videoRef = useRef();
    const mediaRecorderRef = useRef();
    const [recording, setRecording] = useState(false);
    const [chunks, setChunks] = useState([]);

    useEffect(() => {
        async function startStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        }
        startStream();

        return () => {
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startRecording = () => {
        setChunks([]);
        const options = { mimeType: 'video/webm; codecs=vp8,opus' };
        const mediaRecorder = new MediaRecorder(videoRef.current.srcObject, options);

        mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) setChunks(prev => [...prev, e.data]);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            uploadRecording(blob);
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    async function uploadRecording(blob) {
        try {
            const formData = new FormData();
            formData.append('media', blob, 'recording.webm');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Upload failed:', response.statusText);
                return;
            }

            const data = await response.json();
            if (onFeedback) onFeedback(data.feedback);
        } catch (error) {
            console.error('Upload error:', error);
        }
    }

    return (
        <div>
            <video ref={videoRef} autoPlay muted style={{ width: 320, height: 240, backgroundColor: 'black' }} />
            <div style={{ marginTop: 10 }}>
                {!recording && <button onClick={startRecording}>Start Recording</button>}
                {recording && <button onClick={stopRecording}>Stop Recording</button>}
            </div>
        </div>
    );
}

export default VideoRecorder;
