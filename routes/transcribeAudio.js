const fs = require('fs');
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient({
    keyFilename: 'path/to/google-cloud-key.json', // replace with your key file path
});

async function transcribeAudio(filePath) {
    const file = fs.readFileSync(filePath);
    const audioBytes = file.toString('base64');

    const request = {
        audio: {
            content: audioBytes,
        },
        config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 48000,
            languageCode: 'en-US',
        },
    };

    const [response] = await client.recognize(request);
    return response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
}

module.exports = { transcribeAudio };
