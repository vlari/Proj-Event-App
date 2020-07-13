import jwt from 'jsonwebtoken';
const ErrorResponse = require('../../../utils/errorResponse');
import User from '../../db/models/user';
import env from '../../config/env';

export const guard = (req, res, next) => {
  let userToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    userToken = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.userToken) {
    // If using cookies
    userToken = req.cookies.userToken;
  }

  if (!userToken) {
    next(new ErrorResponse('User not authorized', 401));
  }

  try {
    const token = jwt.verify(userToken, env.API_SECRET);

    User.findById(token.id).then(
      (loggedInUser) => {
        req.user = loggedInUser;
        next();
      },
      (error) => {
        next(error);
      }
    );
  } catch (error) {
    next(new ErrorResponse('User not authorized', 401));
  }
};
