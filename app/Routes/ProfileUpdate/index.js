"use strict";

const express = require("express");

const router = express.Router();

const UpdateCurrency = require("./UpdateCurrency");

// # Routes
router.patch("/currency", UpdateCurrency);

module.exports = router;
