import Event from '../../db/models/event';
import Category from '../../db/models/category';
const ErrorResponse = require('../../../utils/errorResponse');

export const getEvents = (req, res, next) => {
    const page = parseInt(req.queryParams.page, 10) || 1;
    const limit = parseInt(req.queryParams.limit, 10) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    Event.find(req.queryParams)
        .skip(startIndex)
        .limit(limit)
        .then(events => {

            const pagination = {};
  
            if (endIndex < events.length) {
                pagination.next = {
                    page: page + 1,
                    limit
                };
            }

            console.log(startIndex)
        
            if (startIndex > 0) {
                pagination.prev = {
                    page: page - 1,
                    limit
                };
            }

            res.status(200).json({ count: events.length , data: events, pagination });
        },
        error => {
            next(error);
        });
};

export const getEvent = (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            if (!event) {
                return next(
                    new ErrorResponse('Event not found', 404)
                    );
                }
                
                res.status(200).json({ data: event });
            },
            error => {
                next(
                    new ErrorResponse('Event not found', 404)
                );
        });
};

export const getEventCategories = (req, res, next) => {
    Category.find()
        .then(categories => {
            res.status(200).json({ data: categories });
        },
        error => {
            next(error);
        });
};

export const createEvent = (req, res, next) => {
    const event = new Event({
        ...req.body,
        userId: req.user._id 
    });

    event.save()
        .then(result => {
            res.status(201).json({ data: event });
        },
        error => next(error));
};

export const updateEvent = (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            if (!event) {
                return next(new ErrorResponse(`Event with id ${req.params.id} not found.`, 404));
            }
            return event;
        })
        .then(event => {
            if (event.userId.toString() !== req.user.id) {
                return next(new ErrorResponse('User is not authorized.', 401));
            }

            return Event.findByIdAndUpdate(req.params.id, req.body, {
                $set: req.body,
                new: true,
                runValidators: true
            });
        })
        .then(event => {
            res.status(200).json({ data: event });
        },
        error => {
            next(error);
        });
};

export const deleteEvent = (req, res, next) => {
    Event.findById(req.params.id)
        .then(event => {
            if (!event) {
                return next(new ErrorResponse(`Event with id ${req.params.id} not found.`, 404));
            }
            return event;
        })
        .then(event => {
            if (event.userId.toString() !== req.user.id) {
                return next(new ErrorResponse('User is not authorized.', 401));
            }

            return Event.findByIdAndRemove(req.params.id, req.body, {
                $set: req.body,
                new: true,
                runValidators: true
            });
        })
        .then(event => {
            res.status(200).json({ data: {} });
        },
        error => {
            next(error);
        });
};
