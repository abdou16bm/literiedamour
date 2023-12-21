const express = require('express');
const order_router = express.Router();


// MY CONTROLLER
const order_controller = require("../controller/customer_order")
const authentication_controller = require('../../admin_app/controller/authentication');


order_router.get('/checkout/:product',order_controller.checkout);

order_router.post('/checkout/:product',order_controller.checkout_valid);

order_router.get('/orders',authentication_controller.isAuthenticated,order_controller.order_list)
order_router.get('/order/:id',authentication_controller.isAuthenticated,order_controller.order_details);


module.exports = order_router;

