import { Router } from 'express';

import run from '../repositories/AgeAndGender';

const ageAndGenderRouter = Router();

ageAndGenderRouter.post('/', async (request, response) => {
    try {
        await run();
        return response.json({ message: 'Detection done successfully' });
    } catch (err) {
        return response.status(400).json(err);
    }
});

export default ageAndGenderRouter;
