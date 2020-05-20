import express from 'express';

import eventRoutes from '../routes/eventRoutes';
import sessionRoutes from '../routes/sessionRoutes';
import orderRoutes from '../routes/orderRoutes';
import customerRoutes from '../routes/customerRoutes';

const router = express.Router();

router.use('/v1', eventRoutes);
router.use('/v1', sessionRoutes);
router.use('/v1', orderRoutes);
router.use('/v1', customerRoutes);

export default router;
