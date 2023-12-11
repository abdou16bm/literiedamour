const express = require('express');
const { home } = require('../controller/home');
const home_router = express.Router();


// MY CONTROLLER
const home_controller = require("../controller/home")


home_router.get('/',home_controller.home);

module.exports = home_router;

