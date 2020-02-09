const boom = require("boom");

const dbQuery = require("../../database/queries/dbQuery");
const { getProject } = require("./helper");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await dbQuery(getProject(id));
    // if no data return 404
    if (project.rowCount === 0) {
      return next(boom.notFound("هذ العنصر غير موجود"));
    }
    res.json({
      response: { data: project.rows, statusCode: 200 },
      error: null
    });
  } catch (error) {
    return next(boom.conflict("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
