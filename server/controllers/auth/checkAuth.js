const { verify } = require("jsonwebtoken");
const boom = require("boom");

const dbQuery = require("../../database/queries/dbQuery");
const { getUserData } = require("./helper");

module.exports = async (req, res, next) => {
  try {
    const { cookies } = req;

    if (!cookies || !cookies.jwt) {
      return next(boom.unauthorized("لا يملك صلاحيات"));
    }
    const decoded = verify(cookies.jwt, process.env.SECRET);
    const { role, id } = decoded;
    const userAvatarResult = await dbQuery(getUserData(id));
    const { full_name, address, email, mobile, avatar } = userAvatarResult.rows[0];
    return res.status(200).json({
      response: {
        role,
        id,
        username: full_name,
        address,
        email,
        mobile,
        avatar:
          avatar ||
          "https://www.pngjoy.com/pngm/136/2750635_gray-circle-login-user-icon-png-transparent-png.png",
        isLogged: true
      },
      error: null
    });
  } catch (error) {
    console.log(55555, error);

    return next(boom.unauthorized("لا يملك صلاحيات"));
  }
};
