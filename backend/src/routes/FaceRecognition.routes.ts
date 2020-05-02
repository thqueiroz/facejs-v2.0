import { Router } from 'express';

import run from '../repositories/FaceRecognitionRepository';

const faceRecognitionRouter = Router();

faceRecognitionRouter.post('/', async (request, response) => {
    try {
        await run();
        return response.json({ message: 'Recognition done successfully' });
    } catch (err) {
        return response.status(400).json(err);
    }
});

export default faceRecognitionRouter;
