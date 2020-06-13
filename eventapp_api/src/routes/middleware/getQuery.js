export const getQuery = (req, res, next) => {
  let queryParams = {};

  if (req.query) {

    queryParams = { ...req.query };

    if (queryParams.date === 'anyDate') {
      delete queryParams.date;
    }

    if (queryParams.price) {
      queryParams.tickets = getPriceQuery(queryParams.price);
      delete queryParams.price;
    }

    req.queryParams = queryParams;
    next();
  } else {
    req.queryParams = queryParams;
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
