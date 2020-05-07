import errorResponse from '../../../utils/errorResponse';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // // Log to console for dev
  // console.log(err);

  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new errorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    error: error.message || 'Internal Server Error'
  });
};

export default errorHandler;
