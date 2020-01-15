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
    if (loginResult.rows.length === 0) {
      return next(boom.unauthorized("لا يوجد حساب مرتبط بهذا البريد الالكتروني"));
    }
    bcrypt.compare(password, loginResult.rows[0].password, (error, result) => {
      if (error) {
        return next(boom.badImplementation("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
      }
      if (!result) {
        return next(boom.unauthorized("كلمة المرور المدخلة غير صحيحة"));
      }
      const cookie = sign(
        {
          username: loginResult.rows[0].username,
          id: loginResult.rows[0].id,
          role: loginResult.rows[0].role
        },
        process.env.SECRET
      );
      res.cookie("jwt", cookie, { httpOnly: true });
      return res.json({ response: { role: loginResult.rows[0].role }, error: null });
    });
  } catch (error) {
    return next(boom.conflict("Server Error"));
  }
};
