const ErrorResponse = require('../../../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.name === 'CastError') {
    error = new ErrorResponse('Resource not found.', 404);
  }

  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    error: error.message || 'Internal Server Error'
  });
};

export default errorHandler;
