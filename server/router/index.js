const router = require("express").Router();

const login = require("../controllers/auth/login");
const signUp = require("../controllers/auth/signUp");
const checkAuth = require("../controllers/auth/checkAuth");
const saveNewProject = require("../controllers/projects/saveNewProject");
const getAllProjects = require("../controllers/projects/getAllProjects");

// login, signup, and logout and auth
router.post("/login", login);
router.post("/signup", signUp);
router.get("/check", checkAuth);

// Projects
router.post("/projects", saveNewProject);
router.get("/projects", getAllProjects);

module.exports = router;
