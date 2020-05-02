import { Router } from 'express';

import faceRecognitionRouter from './FaceRecognition.routes';
import faceDetectionRouter from './FaceDetection.routes';

const routes = Router();

routes.use('/face-recognition', faceRecognitionRouter);
routes.use('/face-detection', faceDetectionRouter);

export default routes;
