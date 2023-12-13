const express = require('express');
const cart_router = express.Router();


// MY CONTROLLER
const cart_controller = require("../controller/cart")
const authentication_controller = require('../../admin_app/controller/authentication');



cart_router.get("/cart",authentication_controller.isAuthenticated,cart_controller.cart_get_one_user)



module.exports = cart_router;

