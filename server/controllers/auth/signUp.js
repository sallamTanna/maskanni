const { sign } = require("jsonwebtoken");
const boom = require("boom");
const bcrypt = require("bcrypt");

const dbQuery = require("../../database/queries/dbQuery");
const { getMails, addNewUser } = require("./helper");

module.exports = async (req, res, next) => {
  const { email, password, fullName, role } = req.body;

  try {
    const allEmails = await dbQuery(getMails());
    const isEmailUsed = allEmails.rows.filter(userEmail => userEmail.email === email);

    if (isEmailUsed.length > 0) return next(boom.conflict("هذا الايميل موجود فعلا"));

    const hashPassword = bcrypt.hashSync(password, 10);
    const addNewUserResult = await dbQuery(addNewUser(fullName, email, hashPassword, role));
    return res.json({ response: { role, fullName, email }, error: null });
  } catch (error) {
    return next(boom.conflict("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
