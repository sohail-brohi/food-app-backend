const express = require("express");
const {
  createCustomization,
} = require("../controllers/customization.controller");
const router = express.Router();

//POST routes
router.post("/create", createCustomization);

module.exports = router;
