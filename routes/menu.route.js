const express = require("express");
const { createMenu } = require("../controllers/menu.controller");
const router = express.Router();

//POST routes
router.post("/create", createMenu);

module.exports = router;
