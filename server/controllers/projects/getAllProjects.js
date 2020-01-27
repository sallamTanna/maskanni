const boom = require("boom");

const dbQuery = require("../../database/queries/dbQuery");
const { getAllProjects } = require("./helper");

module.exports = async (req, res, next) => {
  try {
    const getAllProjectsResult = await dbQuery(getAllProjects());
    res.json({
      response: { data: getAllProjectsResult.rows, statusCode: 200 },
      error: null
    });
  } catch (error) {
    return next(boom.conflict("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
