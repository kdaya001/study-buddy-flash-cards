const errorHandler = (err, req, res, next) => {
  let status = err.status || 300;
  let message = err.message || 'Something went wrong.';

  console.log(status, message);

  res.status(status).json({ message });
  
};

module.exports = errorHandler;