import Event from '../../db/models/event';
const ErrorResponse = require('../../../utils/errorResponse');

export const getEvents = (req, res, next) => {
    Event.find()
        .then(events => {
            res.status(200).json({ data: events });
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
