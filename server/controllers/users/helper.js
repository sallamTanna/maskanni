exports.getAllUserProjects = user_id => ({
  text: "select * FROM projects WHERE user_id = $1",
  values: [user_id]
});

exports.getUserProject = (user_id, project_id) => ({
  text: "select * FROM projects WHERE user_id = $1 AND id = $2",
  values: [user_id, project_id]
});

exports.updatePersonalData = (fullName, email, mobile, address, user_id) => ({
  text: "UPDATE users SET full_name = $1, email = $2, mobile = $3, address= $4 WHERE id = $5",
  values: [fullName, email, mobile, address, user_id]
});

exports.getUserPassword = user_id => ({
  text: "SELECT password FROM users WHERE id = $1",
  values: [user_id]
});

exports.updatePassword = (password, user_id) => ({
  text: "UPDATE users SET password = $1 WHERE id = $2",
  values: [password, user_id]
});

exports.updatePaypal = (paypal, user_id) => ({
  text: "UPDATE users SET paypal = $1 WHERE id = $2",
  values: [paypal, user_id]
});

exports.updateProfileImg = (img, user_id) => ({
  text: "UPDATE users SET profile_img = $1 WHERE id = $2",
  values: [img, user_id]
});
