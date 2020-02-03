const router = require("express").Router();

const login = require("../controllers/auth/login");
const signUp = require("../controllers/auth/signUp");
const saveNewProject = require("../controllers/projects/saveNewProject");
const getAllProjects = require("../controllers/projects/getAllProjects");
const getUserProjects = require("../controllers/users/getUserProjects");

// login, signup, and logout and auth
router.post("/login", login);
router.post("/signup", signUp);

// Users
router.get("/users/:user_id/projects/:project_id?", getUserProjects); // return project/s of specific user

// Projects
router.post("/projects", saveNewProject); // add new project
router.get("/projects", getAllProjects); // return all projects for all users

module.exports = router;
