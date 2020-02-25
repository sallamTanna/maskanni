const boom = require("boom");

const dbQuery = require("../../database/queries/dbQuery");
const { getAllUserProjects, getUserProject } = require("./helper");

module.exports = async (req, res, next) => {
  try {
    const { user_id, project_id } = req.params;
    if (project_id) {
      const getUserProjectResult = await dbQuery(getUserProject(user_id, project_id));
      res.json({
        response: { data: getUserProjectResult.rows, statusCode: 200 },
        error: null
      });
    } else {
      const getAllUserProjectResult = await dbQuery(getAllUserProjects(user_id));
      res.json({
        response: { data: getAllUserProjectResult.rows, statusCode: 200 },
        error: null
      });
    }
  } catch (error) {
    return next(boom.conflict("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
