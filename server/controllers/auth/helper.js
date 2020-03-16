const Joi = require("@hapi/joi");

exports.findByEmail = email => ({
  text: `SELECT * FROM users WHERE email = $1`,
  values: [email]
});

exports.getMails = () => ({
  text: `SELECT email FROM users`
});

exports.addNewUser = (fullName, email, password, role) => ({
  text: `INSERT INTO users(full_name, email, password, role) values($1, $2, $3, $4)`,
  values: [fullName, email, password, role]
});

exports.getUserData = (user_id) => ({
  text: `SELECT avatar, full_name, email, address, mobile FROM users WHERE id = $1`,
  values: [user_id]
});

exports.validateCredentials = () =>
  Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(15)
      .required()
  });
