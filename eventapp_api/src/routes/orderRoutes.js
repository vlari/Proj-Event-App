import express from 'express';

import {
    getOrders,
    getOrder,
    placeOrder    
} from './controllers/ordersController';
import { guard } from '../routes/middleware/auth';

const router = express.Router();

router.route('/orders').get(guard, getOrders);
router.route('/orders/:id').get(guard, getOrder);
router.route('/orders').post(guard, placeOrder);

export default router;
