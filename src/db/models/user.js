import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import env from '../../config/env';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please add a date']
    },
    phone: String,
    address: {
      type: String,
    },
    email: {
      type: String,
      match: [
        /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: 8,
      select: false,
    },
    passwordExpireTime: Date,
    passwordNewToken: String
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  if(!this.isModified('password')) {
    next();
  }

  return bcrypt
    .hash(this.password, 10)
    .then((hashedPassword) => (this.password = hashedPassword));
});

userSchema.methods.getSignedToken = function () {
    return jwt.sign({
      id: this._id 
    },
    env.API_SECRET, {
        expiresIn: env.API_EXPIRE
    })
};

userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.methods.getNewToken = function() {
  const newToken = crypto.randomBytes(20).toString('hex');
  // Hash token and set to resetPasswordToken field
  this.passwordNewToken = crypto
    .createHash('sha256')
    .update(newToken)
    .digest('hex');

  // Set expire
  this.passwordExpireTime = Date.now() + 10 * 60 * 1000;

  return newToken
}

export default mongoose.model('User', userSchema);
