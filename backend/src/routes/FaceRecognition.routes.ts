import { Router } from 'express';
import saveFile from '../config/imageConfig';

import run from '../repositories/FaceRecognitionRepository';

const faceRecognitionRouter = Router();

faceRecognitionRouter.post('/', async (request, response) => {
    try {
        const { image } = request.body;
        const base64Image = image.split(';base64,').pop();
        await saveFile(base64Image);
        const verify = await run();
        return response.json({
            found: verify,
        });
    } catch (err) {
        return response.status(400).json(err);
    }
});

export default faceRecognitionRouter;
