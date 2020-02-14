const { verify } = require("jsonwebtoken");
const boom = require("boom");

const dbQuery = require("../../database/queries/dbQuery");
const { getUserAvatar } = require("./helper");

module.exports = (req, res, next) => {
  const { cookies } = req;

  if (!cookies || !cookies.jwt) {
    return next(boom.unauthorized("لا يملك صلاحيات"));
  }
  return verify(cookies.jwt, process.env.SECRET, async (err, decoded) => {
    if (err) {
      res.clearCookie("jwt");
      return next(boom.unauthorized("لا يملك صلاحيات"));
    }
    const { role, id, username, email } = decoded;
    const userAvatarResult = await dbQuery(getUserAvatar(id));
    return res.status(200).json({
      response: {
        role,
        id,
        username,
        email,
        avatar:
          userAvatarResult.rows[0].avatar ||
          "https://www.pngjoy.com/pngm/136/2750635_gray-circle-login-user-icon-png-transparent-png.png",
        isLogged: true
      },
      error: null
    });
  });
};
