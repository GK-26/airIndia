const express = require('express');
const passport = require('passport');
const router = express.Router();
const helpController = require("../../controllers/help.controller")
const jwt = require('jsonwebtoken');


router.get("/help", helpController.helpDetails);



module.exports = router