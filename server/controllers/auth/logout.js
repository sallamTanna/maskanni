const boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.end();
  } catch (err) {
    return next(boom.badImplementation("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
