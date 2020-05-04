import { Router } from 'express';

import faceRecognitionRouter from './FaceRecognition.routes';
import faceDetectionRouter from './FaceDetection.routes';
import ageAndGenderRouter from './AgeAndGender.routes';

const routes = Router();

routes.use('/face-recognition', faceRecognitionRouter);
routes.use('/face-detection', faceDetectionRouter);
routes.use('/age-gender', ageAndGenderRouter);

export default routes;
