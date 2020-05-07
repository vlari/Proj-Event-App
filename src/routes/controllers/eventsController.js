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
    const event = new Event(req.body);

    event.save()
        .then(result => {
            res.status(201).json({ data: event });
        },
        error => next(error));
};

export const updateEvent = (req, res, next) => {

    Event.findByIdAndUpdate(req.params.id, req.body, {
        $set: req.body,
        new: true,
        runValidators: true
    })
    .then(event => {
        res.status(200).json({ data: event });
    },
    error => {
        next(error);
    });
};

export const deleteEvent = (req, res, next) => {

    Event.findByIdAndDelete(req.params.id)
    .then(event => {
        if (!event) {
            return next(
                new ErrorResponse('Event not found', 404)
                );
            }

        res.status(200).json({ data: event });
    },
    error => {
        next(error);
    });
};
