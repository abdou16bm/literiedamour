const express = require('express');
const order_router = express.Router();


// MY CONTROLLER
const order_controller = require("../controller/customer_order")


order_router.get('/checkout/:product',order_controller.checkout);

order_router.post('/checkout/:product',order_controller.checkout_valid);


module.exports = order_router;

