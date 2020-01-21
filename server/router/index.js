const router = require("express").Router();

const login = require("../controllers/auth/login");
const signUp = require("../controllers/auth/signUp");

// login, signup, and logout and auth
router.post("/login", login);
router.post("/signup", signUp);

module.exports = router;
