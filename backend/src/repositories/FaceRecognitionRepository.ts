import * as faceapi from 'face-api.js';
import path from 'path';

import {
    canvas,
    faceDetectionNet,
    faceDetectionOptions,
    saveFile,
} from '../commons';

const faceDetectionNetJson = path.join(__dirname, '..', '..', 'weights');
const faceLandmark68NetJson = path.join(__dirname, '..', '..', 'weights');
const faceRecognitionNetJson = path.join(__dirname, '..', '..', 'weights');

const REFERENCE_IMAGE = path.join(__dirname, '..', 'assets', 'ref1.png');
const QUERY_IMAGE = path.join(__dirname, '..', 'assets', 'ref3.jpeg');

async function run(): Promise<void> {
    await faceDetectionNet.loadFromDisk(faceDetectionNetJson);

    await faceapi.nets.faceLandmark68Net.loadFromDisk(faceLandmark68NetJson);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(faceRecognitionNetJson);

    const referenceImage = await canvas.loadImage(REFERENCE_IMAGE);

    const queryImage = await canvas.loadImage(QUERY_IMAGE);

    const resultsRef = await faceapi
        .detectAllFaces(referenceImage, faceDetectionOptions)
        .withFaceLandmarks()
        .withFaceDescriptors();

    const resultsQuery = await faceapi
        .detectAllFaces(queryImage, faceDetectionOptions)
        .withFaceLandmarks()
        .withFaceDescriptors();

    const faceMatcher = new faceapi.FaceMatcher(resultsRef);

    const labels = faceMatcher.labeledDescriptors.map(ld => ld.label);
    const refDrawBoxes = resultsRef
        .map(res => res.detection.box)
        .map((box, i) => new faceapi.draw.DrawBox(box, { label: labels[i] }));
    const outRef = faceapi.createCanvasFromMedia(referenceImage);
    refDrawBoxes.forEach(drawBox => drawBox.draw(outRef));

    saveFile('referenceImage.jpg', (outRef as any).toBuffer('image/jpeg'));

    const queryDrawBoxes = resultsQuery.map(res => {
        const bestMatch = faceMatcher.findBestMatch(res.descriptor);
        return new faceapi.draw.DrawBox(res.detection.box, {
            label: bestMatch.toString(),
        });
    });
    const outQuery = faceapi.createCanvasFromMedia(queryImage);
    queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery));
    saveFile('queryImage.jpg', (outQuery as any).toBuffer('image/jpeg'));
    console.log('done, saved results to out/queryImage.jpg');
}

export default run;
