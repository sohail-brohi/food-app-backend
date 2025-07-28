const express = require("express");
const { SignUp, Login, getAllUser } = require("../controllers/user.controller");
const router = express.Router();

//POST routes
router.post("/sign-up", SignUp);
router.post("/login", Login);
router.get("/", getAllUser);

module.exports = router;
