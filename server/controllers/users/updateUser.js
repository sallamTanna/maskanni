const boom = require("boom");
const bcrypt = require("bcrypt");

const dbQuery = require("../../database/queries/dbQuery");
const {
  updatePersonalData,
  getUserPassword,
  updatePassword,
  updatePaypal,
  updateProfileImg
} = require("./helper");

module.exports = async (req, res, next) => {
  const {
    username,
    email,
    mobile,
    address,
    password,
    newPassword,
    paypal,
    profileImage
  } = req.body;
  const { user_id } = req.params;
  console.log(444444, req.params);
  console.log("00000000000", user_id, username, email, mobile, address);

  try {
    if (user_id && username && email && mobile && address) {
      const updatePersonalDataResult = await dbQuery(
        updatePersonalData(username, email, mobile, address, user_id)
      );
      res.json({
        response: { data: updatePersonalDataResult.rows, statusCode: 200 },
        error: null
      });
    }
    if (password && user_id) {
      const getUserPasswordResult = await dbQuery(getUserPassword(user_id));
      const salt = bcrypt.genSaltSync(10);

      if (!bcrypt.compareSync(password, getUserPasswordResult.rows[0].password))
        next(boom.conflict("كلمة المرور الحالية المدخلة غير صحيحة"));

      const newPasswordHash = bcrypt.hashSync(newPassword, salt);
      const updatePasswordResult = await dbQuery(updatePassword(newPasswordHash, user_id));
      res.json({
        response: { data: updatePasswordResult.rows, statusCode: 200 },
        error: null
      });
    }
    if (paypal && user_id) {
      const updatePaypalResult = await dbQuery(updatePaypal(paypal, user_id));
      res.json({
        response: { data: updatePaypalResult.rows, statusCode: 200 },
        error: null
      });
    }
    if (profileImage && user_id) {
      const updateProfileImgResult = await dbQuery(updateProfileImg(profileImage, user_id));
      res.json({
        response: { data: updateProfileImgResult.rows, statusCode: 200 },
        error: null
      });
    }
  } catch (error) {
    console.log(222, error);

    return next(boom.conflict("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
