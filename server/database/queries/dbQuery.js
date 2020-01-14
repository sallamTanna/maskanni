const connection = require("../config/connection");

const dbQuery = sql =>
  new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });

module.exports = dbQuery;
