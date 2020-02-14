const boom = require("boom");

const dbQuery = require("../../database/queries/dbQuery");
const { getProject, getRandomProjects } = require("./helper");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await dbQuery(getProject(id));
    const randomProjects = await dbQuery(getRandomProjects(id));
    // if no data return 404
    if (project.rowCount === 0) {
      return next(boom.notFound("هذ العنصر غير موجود"));
    }

    console.log(randomProjects);

    res.json({
      response: { data: { project: project.rows, randomProjects }, statusCode: 200 },
      error: null
    });
  } catch (error) {
    return next(boom.conflict("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
