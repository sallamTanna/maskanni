const boom = require("boom");

const dbQuery = require("../../database/queries/dbQuery");
const { getSpecificUser, getAllUsers } = require("./helper");

module.exports = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    if (user_id) {
      const getSpecificUserResult = await dbQuery(getSpecificUser(user_id));
      const user = {
        username: getSpecificUserResult.rows[0].full_name,
        email: getSpecificUserResult.rows[0].email,
        address: getSpecificUserResult.rows[0].address,
        mobile: getSpecificUserResult.rows[0].mobile
      };
      res.json({
        response: { data: user, statusCode: 200 },
        error: null
      });
    } else {
      const getAllUsersResult = await dbQuery(getAllUsers());
      res.json({
        response: { data: getAllUsersResult.rows, statusCode: 200 },
        error: null
      });
    }
  } catch (error) {
    return next(boom.conflict("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
