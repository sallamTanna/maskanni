const { Pool } = require("pg");
require("dotenv").config();

let connectionString = process.env.NODE_ENV;

if (connectionString === "development") connectionString = process.env.DEVELOPMENT_DATABASE_URL;
if (connectionString === "production") connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("DATABASE_URL is not found!");

const options = {
  connectionString,
  ssl: !connectionString.includes("localhost")
};

module.exports = new Pool(options);
