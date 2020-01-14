const fs = require("fs");

const dbQuery = require("./queries/dbQuery");

const sql = fs.readFileSync(`${__dirname}/build.sql`).toString();

const dbConnection = async () => {
  try {
    await dbQuery(sql);
    console.log("Database has been initialized successfully");
  } catch (error) {
    console.log("Error while initializing database: ", error);
  }
};

module.exports = dbConnection();
