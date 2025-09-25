const fs = require('fs');
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient({
    keyFilename: 'path/to/google-cloud-key.json',
});

async function transcribeAudio(filePath) {
    const file = fs.readFileSync(filePath);
    const audioBytes = file.toString('base64');

    const request = {
        audio: {
            content: audioBytes,
        },
        config: {
            encoding: 'WEBM_OPUS', // or use 'LINEAR16' depending on your audio
            sampleRateHertz: 48000, // adjust as per your audio specs
            languageCode: 'en-US',
        },
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');

    return transcription;
}

module.exports = {
    transcribeAudio,
};
