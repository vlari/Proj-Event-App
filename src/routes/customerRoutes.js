import express from 'express';

import { 
   updateCustomer
} from './controllers/customersController';
import { guard } from '../routes/middleware/auth'; 

const router = express.Router();

router.route('/user/:id').patch(guard, updateCustomer);

export default router;
