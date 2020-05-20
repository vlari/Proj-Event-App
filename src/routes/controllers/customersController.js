import User from '../../db/models/user';

export const updateCustomer = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ data: user });
};
