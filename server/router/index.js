const router = require("express").Router();

const login = require("../controllers/auth/login");
const signUp = require("../controllers/auth/signUp");
const checkAuth = require("../controllers/auth/checkAuth");
const logout = require("../controllers/auth/logout");
const saveNewProject = require("../controllers/projects/saveNewProject");
const getAllProjects = require("../controllers/projects/getAllProjects");
const getUserProjects = require("../controllers/users/getUserProjects");
const updateUserData = require("../controllers/users/updateUser");

// login, signup, and logout and auth
router.post("/login", login);
router.post("/signup", signUp);
router.get("/check", checkAuth);
router.get("/logout", logout);

// Users
router.get("/users/:user_id/projects/:project_id?", getUserProjects); // return project/s of specific user
router.put("/users/:user_id", updateUserData);

// Projects
router.post("/projects", saveNewProject); // add new project
router.get("/projects", getAllProjects); // return all projects for all users

module.exports = router;
