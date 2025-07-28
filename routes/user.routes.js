const express = require("express");
const { SignUp, Login } = require("../controllers/user.controller");
const router = express.Router();

//POST routes
router.post("/sign-up", SignUp);
router.post("/login", Login);

module.exports = router;
