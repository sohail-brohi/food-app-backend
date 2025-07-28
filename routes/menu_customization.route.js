const express = require("express");
const {
  createMenuCustomization,
} = require("../controllers/menu_customization.controller");
const router = express.Router();

//POST routes
router.post("/create", createMenuCustomization);

module.exports = router;
