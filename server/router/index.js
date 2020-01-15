const router = require("express").Router();

const login = require("../controllers/auth/login");

// login and logout and auth
router.post("/login", login);

module.exports = router;
