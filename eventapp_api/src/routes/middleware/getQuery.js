import Event from '../../db/models/event';

export const getQuery = async (req, res, next) => {
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
        queryParams.tickets = getPriceQuery(queryParams.price);
      }
      delete queryParams.price;
    }

    queryParams = cleanQuery(queryParams);
    queryParams.total = await Event.countDocuments(queryParams.query);
    console.log('query filter params', queryParams);
    req.queryParams = queryParams;
    next();
  } else {
    req.queryParams = {};
    next();
  }
};

const getPriceQuery = (type) => {
    let price = {};

    if (type === 'free') {
        price = { $size: 0 };
    } else if (type === 'paid') {
        price = { $not: { $size: 0 } };
    } 

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
