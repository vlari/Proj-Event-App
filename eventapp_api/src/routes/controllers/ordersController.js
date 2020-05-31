import Order from '../../db/models/order';
const ErrorResponse = require('../../../utils/errorResponse');

export const getOrders = (req, res, next) => {
    Order.find()
        .then(orders => {
            res.status(200).json({ data: ordes });
        },
        error => {
            next(new ErrorResponse('Error', 400));
        });
};

export const getOrder = (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => {
            if (!order) {
                return next(new ErrorResponse('Order not found', 404));
            }

            res.status(200).json({ data: order });
        },
        error => {
            next(new ErrorResponse('Error', 400));
        });
};

export const placeOrder = (req, res, next) => {
    const user = { 
        userId: req.user._id,
        name: req.user.name,
        email: req.user.email
    };

    const orderDetails = { 
        ...req.body,
        user: user 
    };

    const order = new Order(orderDetails);
    order.save()
        .then(result => {
            res.status(201).json({ data: order });
        },
        error => {
           next(new ErrorResponse('Error', 400));
        });
};
