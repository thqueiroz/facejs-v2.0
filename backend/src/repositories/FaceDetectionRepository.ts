import * as faceapi from 'face-api.js';
import path from 'path';

import {
    canvas,
    faceDetectionNet,
    faceDetectionOptions,
    saveFile,
} from '../commons';

const faceDetectionNetJson = path.join(__dirname, '..', '..', 'weights');

async function run(): Promise<void> {
    await faceDetectionNet.loadFromDisk(faceDetectionNetJson);

    const img = await canvas.loadImage('../assets/ref1.png');
    const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);

    const out = faceapi.createCanvasFromMedia(img) as any;
    faceapi.draw.drawDetections(out, detections);

    saveFile('faceDetection.jpg', out.toBuffer('image/jpeg'));
    console.log('done, saved results to out/faceDetection.jpg');
}

export default run;
