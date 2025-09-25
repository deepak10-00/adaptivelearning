const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { convertVideoToAudio } = require('./convertVideoToAudio');
const { transcribeAudio } = require('./transcribeAudio');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

function analyzeTranscription(transcription) {
    const sentences = transcription.split('.').filter(Boolean);
    return sentences.map((sentence, index) => ({
        questionIndex: index,
        feedback: sentence.length > 20 ? 'Good answer' : 'Try to give more detailed answers',
    }));
}

router.post('/upload', upload.single('media'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        let audioFilePath = req.file.path;

        if (req.file.mimetype.startsWith('video/')) {
            audioFilePath = path.join(__dirname, 'uploads', `${req.file.filename}.wav`);
            await convertVideoToAudio(req.file.path, audioFilePath);
            fs.unlinkSync(req.file.path); // delete original video
        }

        const transcription = await transcribeAudio(audioFilePath);

        fs.unlinkSync(audioFilePath); // delete audio after transcription

        const feedback = analyzeTranscription(transcription);

        res.json({ transcription, feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
