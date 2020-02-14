const { sign } = require("jsonwebtoken");
const boom = require("boom");
const bcrypt = require("bcrypt");

const dbQuery = require("../../database/queries/dbQuery");
const { findByEmail, validateCredentials } = require("./helper");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const schemaObject = validateCredentials();
    const schema = await schemaObject.validateAsync({ email, password });
    const loginResult = await dbQuery(findByEmail(email.toLowerCase()));

    if (loginResult.rows.length === 0)
      return next(boom.unauthorized("لا يوجد حساب مرتبط بهذا البريد الالكتروني"));

    const isEqualPasswords = bcrypt.compareSync(password, loginResult.rows[0].password);
    if (isEqualPasswords) {
      const cookie = sign(
        {
          username: loginResult.rows[0].full_name,
          id: loginResult.rows[0].id,
          email: loginResult.rows[0].email,
          role: loginResult.rows[0].role
        },
        process.env.SECRET
      );
      res.cookie("jwt", cookie, { httpOnly: true });
      return res.json({
        response: {
          role: loginResult.rows[0].role,
          username: loginResult.rows[0].username,
          avatar: loginResult.rows[0].avatar
        },
        error: null
      });
    }
    return next(boom.unauthorized("كلمة المرور المدخلة غير صحيحة"));
  } catch (error) {
    return next(boom.conflict("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
