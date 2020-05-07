import express from 'express';

import eventRoutes from '../routes/eventRoutes';

const router = express.Router();

router.use('/v1', eventRoutes);

export default router;
