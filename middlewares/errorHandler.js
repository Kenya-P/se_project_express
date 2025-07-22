module.exports = (err, req, res) => {
  const { statusCode = 500, message } = err;

  console.error(`❌ Error: ${message}`);

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'An internal server error occurred'
      : message,
  });
};