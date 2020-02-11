const { verify } = require("jsonwebtoken");
const boom = require("boom");

module.exports = (req, res, next) => {
  const { cookies } = req;

  if (!cookies || !cookies.jwt) {
    return next(boom.unauthorized("لا يملك صلاحيات"));
  }
  return verify(cookies.jwt, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.clearCookie("jwt");
      return next(boom.unauthorized("لا يملك صلاحيات"));
    }
    const { role, id, username, email } = decoded;
    return res
      .status(200)
      .json({ response: { role, id, username, email, isLogged: true }, error: null });
  });
};
