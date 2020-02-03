exports.getAllUserProjects = user_id => ({
  text: "select * FROM projects WHERE user_id = $1",
  values: [user_id]
});

exports.getUserProject = (user_id, project_id) => ({
  text: "select * FROM projects WHERE user_id = $1 AND id = $2",
  values: [user_id, project_id]
});
