const ErrorResponse = require('../../../utils/errorResponse');
import User from '../../db/models/user';
import env from '../../config/env';
import sendEmail from '../../../utils/emailSender';
import crypto from 'crypto';
import { recoverPasswordTemplate } from '../../../utils/emailTemplates';

export const signUp = (req, res, next) => {
  const { name, email, dateOfBirth, password } = req.body;

  User.create({
    name,
    email,
    dateOfBirth,
    password,
  }).then(
    (user) => {
        getToken(user, 200, res);
    },
    (error) => {
      next(new ErrorResponse('Error while signing up new user.', 400));
    }
  );
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Wrong credentials', 400));
  }

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new ErrorResponse('Invalid user account.', 401));
      }

      return { 
          isValid: user.isValidPassword(password),
          user
        };
    })
    .then((account) => {
      if (!account.isValid) {
        return next(new ErrorResponse('Invalid user account.', 401));
      }

      getToken(account.user, 200, res);
    });
};

export const logout = (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({ data: {} });
};

export const getAccountUser = (req, res, next) => {
    User.findById(req.user.id)
        .then(user => {
            res.status(200).json({ data: user });
        },
        error => {
          return next(new ErrorResponse('User not authorized.', 401));
        });
};

export const recoverPassword = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {

          if (!user) {
            return next(new ErrorResponse('User not found.', 404));
          }

          return user.save({ validateBeforesave: false });        
        })
        .then(user => {
          let newToken = user.getNewToken();
          const url = `${req.protocol}://${req.get('host')}/api/v1/account/password/reset/${newToken}`;

          try {
            const emailTemplate = recoverPasswordTemplate({
              email: user.email,
              url: url
            });
            sendEmail({
              email: user.email,
              subject: 'Reset your password.',
              emailTemplate
            }).then(result => {
              res.status(200).json({ data: 'Email sent' });
            });
          }
          catch(err) {
            user.passwordExpireTime = undefined;
            user.passwordNewToken = undefined;

            user.save({ validateBeforesave: false })
              .then(user => console.log(user));
          }
        },
        error => next(error));
};

export const resetPassword = (req, res, next) => {
  const newToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

    User.findOne({
      passwordNewToken: token,
      passwordExpireTime: { $gt: Date.now() }
    })
    .then(user => {
      if (!user) {
        return next(new ErrorResponse('Invalid user token', 401));
      }

      user.password = req.body.password;
      user.passwordNewToken = undefined;
      user.passwordExpireTime = undefined;
      return user.save();
    })
    .then(updatedUser => {
      getToken(updatedUser, 200, res);
    });

};

export const patchPassword = (req, res, next) => {
  User.findById(req.user.id).select('+password')
    .then(user => {
      return { 
        isValid: user.isValidPassword(password),
        user
      };
    })
    .then(account => {
      if(!account.isValid) {
        return next(new ErrorResponse('Invalid user account.', 401));
      }

      account.user.password = req.body.password;
      return user.save();
    })
    .then(user => getToken(user, 200, res));
}

const getToken = (user, statusCode, res) => {
    const userToken = user.getSignedToken();
    
    const cookieOptions = {
        expires: new Date(Date.now() + env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    res.status(statusCode).cookie('userToken', userToken, cookieOptions).json({
        userToken
    });
};
