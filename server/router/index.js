const router = require("express").Router();

const login = require("../controllers/auth/login");
const signUp = require("../controllers/auth/signUp");
const saveNewProject = require("../controllers/projects/saveNewProject");
const getAllProjects = require("../controllers/projects/getAllProjects");
const getProject = require("../controllers/projects/getProject");

// login, signup, and logout and auth
router.post("/login", login);
router.post("/signup", signUp);

// Projects
router.post("/projects", saveNewProject);
router.get("/projects", getAllProjects);

// specific projecet
router.get("/projects/:id", getProject);

module.exports = router;
