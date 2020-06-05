import express from 'express';

import { 
    getEvents,
    getEvent,
    getEventCategories,
    createEvent,
    updateEvent,
    deleteEvent
} from './controllers/eventsController';
import { guard } from '../routes/middleware/auth'; 

const router = express.Router();

router.route('/events').get(getEvents);
router.route('/events/:id').get(getEvent);
router.route('/events/categories').get(getEventCategories);
router.route('/events').post(guard, createEvent);
router.route('/events/:id').put(guard, updateEvent);
router.route('/events/:id').delete(guard, deleteEvent);

export default router;
