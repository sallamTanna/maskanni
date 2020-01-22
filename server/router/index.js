const router = require("express").Router();

const login = require("../controllers/auth/login");
const signUp = require("../controllers/auth/signUp");
const saveNewProject = require("../controllers/projects/saveNewProject");

// login, signup, and logout and auth
router.post("/login", login);
router.post("/signup", signUp);

// Projects
router.post("/projects", saveNewProject);

module.exports = router;
