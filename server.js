const express = require('express');
const cors = require('cors');
const geminiRoutes = require('./routes/gemini');
const feedbackRoutes = require('./routes/feedback');
const multer = require('multer');
const path = require('path');
const { transcribeAudio } = require('./routes/speechToText');  // Adjust path as needed
const { convertVideoToAudio } = require('./routes/videoToAudio'); // Add this
require('dotenv').config();

console.log('Loaded API key:', process.env.GEMINI_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

// Video upload config
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // max 100MB
    fileFilter: function (req, file, cb) {
        const filetypes = /webm|mp4|mov/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Videos Only!");
        }
    },
}).single("video");

// Route for video upload
app.post('/upload-video', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        res.status(200).json({ message: "Video uploaded successfully", file: req.file.filename });
    });
});

// Route for speech-to-text transcription with video-to-audio conversion
app.post('/transcribe', async (req, res) => {
    try {
        const videoFilePath = path.join(__dirname, 'uploads', req.body.filename);
        const audioFilePath = path.join(__dirname, 'uploads', `${Date.now()}_audio.wav`);

        // Convert video to audio first
        await convertVideoToAudio(videoFilePath, audioFilePath);

        // Transcribe the converted audio
        const transcription = await transcribeAudio(audioFilePath);

        res.status(200).json({ transcription });
    } catch (error) {
        console.error('Transcription error:', error);
        res.status(500).json({ message: 'Transcription failed' });
    }
});

// Feedback routes for answer analysis
app.use('/api/feedback', feedbackRoutes);

// Existing Gemini API routes
app.use('/api/gemini', geminiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
