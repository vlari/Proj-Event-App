import Event from '../../db/models/event';
import { getUserToken } from '../../../utils/auth';
import jwt from 'jsonwebtoken';
import User from '../../db/models/user';
import env from '../../config/env';

export const getFilter = async (req, res, next) => {
  if (req.query) {
    let queryParams = { ...req.query };

    if (queryParams.filter) {
      const name = queryParams.filter;
      let regValue = new RegExp(name, 'i');
      queryParams.name = { $regex: regValue };
      delete queryParams.filter;
    }

    if (queryParams.date === 'anyDate' || !queryParams.date) {
      delete queryParams.date;
    }

    if (queryParams.price) {
      if (queryParams.price !== 'anyPrice') {
        queryParams['ticket.price'] = getPriceQuery(queryParams.price);;
      }
      delete queryParams.price;
    }

    let userToken = getUserToken(req);

    if (userToken) {
      const token = jwt.verify(userToken, env.API_SECRET);

      const loggedInUser = await User.findById(token.id);
      req.user = loggedInUser;
    }

    queryParams = cleanQuery(queryParams);
    queryParams.total = await Event.countDocuments(queryParams.query);
    req.queryParams = queryParams;
    next();
  } else {
    req.queryParams = {};
    next();
  }
};

const getPriceQuery = (type) => {
    let price = type === 'free' ? '0' : { $gt:  '0' };
    return price;
};

const cleanQuery = (query) => {
  let navigation = {};
  if (query.page) {
      navigation.page = query.page;
      delete query.page;
  }
  
  if (query.limit) {
      navigation.limit = query.limit;
      delete query.limit;
  }

  return { query, navigation };
};
