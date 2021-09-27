const logger = (req, res, next) => {
  console.log("Logging....");
  next();
};
const authenticator = (req, res, next) => {
  console.log("Authenticating....");
  next();
};

module.exports = {
  logger,
  authenticator,
};
