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
import { getFilter } from '../routes/middleware/getFilter';

const router = express.Router();

router.route('/events').get(getFilter, getEvents);
router.route('/events/:id').get(getEvent);
router.route('/events/categories').get(getEventCategories);
router.route('/events').post(guard, (req, res) => res.status(405).json({ data: 'Method not allowed' }));
router.route('/events/:id').put(guard, (req, res) => res.status(405).json({ data: 'Method not allowed' }));
router.route('/events/:id').delete(guard, (req, res) => res.status(405).json({ data: 'Method not allowed' }));

export default router;
