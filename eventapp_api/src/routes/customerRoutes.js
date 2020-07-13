import express from 'express';

import { 
   updateCustomer,
   getSavedEvents,
   updateEvent,
   deleteSavedEvent
} from './controllers/customersController';
import { guard } from '../routes/middleware/auth'; 

const router = express.Router();

router.route('/user/:id').patch(guard, updateCustomer);
router.route('/user/collections').get(guard, getSavedEvents);
router.route('/user/collections/:id').put(guard, updateEvent);
router.route('/user/collections/:id').delete(guard, deleteSavedEvent);

export default router;
