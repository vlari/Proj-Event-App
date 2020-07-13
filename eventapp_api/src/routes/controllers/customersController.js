import User from '../../db/models/user';
import Collection from '../../db/models/collection';
const ErrorResponse = require('../../../utils/errorResponse');

export const updateCustomer = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ data: user });
};

export const getSavedEvents = (req, res, next) => {
    Collection.findOne({ userId: req.user._id })
        .then(collection => {
            res.status(200).json({ totalCount: collection.events.length, data: collection });
        },
        error => next(error));
};

export const updateEvent = (req, res, next) => {
    Collection.findOne({ userId: req.user._id })
        .then(collection => {

            if (!collection) {
                return next(new ErrorResponse('Collection not found', 404));
            }

            collection.events.push(req.params.id);
            return collection.save();
        })
        .then(newCollection => {
            res.status(200).json({ data: newCollection });
        },
        error => next(error));
}

export const deleteSavedEvent = (req, res, next) => {
    Collection.findOne({ userId: req.user._id })
        .then(collection => {

            if (!collection) {
                return next(new ErrorResponse('Collection not found', 404));
            }

            const eventsCollection = collection.events.map(event => {
                return req.user._id != req.params.id;
            });

            const index = collection.events.indexOf(req.user._id.toString());
            collection.events.splice(index, 1);

            return collection.save();
        })
        .then(newCollection => {
            res.status(200).json({ data: {} });
        },
        error => next(error));
}
