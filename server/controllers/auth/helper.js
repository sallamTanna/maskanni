const Joi = require("@hapi/joi");

exports.findByEmail = email => ({
  text: `SELECT * FROM users WHERE email = $1`,
  values: [email]
});

exports.getMails = () => ({
  text: `SELECT email FROM users`
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
