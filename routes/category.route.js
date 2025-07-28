const express = require("express");
const { createCategory } = require("../controllers/category.controller");
const router = express.Router();

//POST routes
router.post("/create", createCategory);

module.exports = router;
