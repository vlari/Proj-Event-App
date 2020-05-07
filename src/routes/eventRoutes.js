import express from 'express';

import Event from '../db/models/event';
// import { eventController } from '../routes/controllers/eventsController';
import { 
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} from '../routes/controllers/eventsController';

const router = express.Router();

router.route('/events').get(getEvents);
router.route('/events/:id').get(getEvent);
router.route('/events').post(createEvent);
router.route('/events/:id').put(updateEvent);
router.route('/events/:id').delete(deleteEvent);

export default router;
