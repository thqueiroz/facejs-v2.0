import { Router } from 'express';

import run from '../repositories/FaceDetectionRepository';

const faceDetectionRouter = Router();

faceDetectionRouter.get('/', async (request, response) => {
    try {
        await run();
        return response.json({ message: 'Detection done successfully' });
    } catch (err) {
        return response.status(400).json(err);
    }
});

export default faceDetectionRouter;
