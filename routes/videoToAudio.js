const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

function convertVideoToAudio(videoFilePath, outputAudioPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(videoFilePath)
            .noVideo()
            .audioCodec('pcm_s16le')
            .format('wav')
            .on('end', () => {
                resolve(outputAudioPath);
            })
            .on('error', (err) => {
                reject(err);
            })
            .save(outputAudioPath);
    });
}

module.exports = { convertVideoToAudio };
