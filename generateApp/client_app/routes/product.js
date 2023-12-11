const express = require('express');
const { home } = require('../controller/product');
const product_router = express.Router();


// MY CONTROLLER
const product_controller = require("../controller/product")


product_router.get('/product/:id/details',product_controller.product_details);

product_router.get('/products/list/:page',product_controller.product_list_page);


product_router.get('/compare/:p1',product_controller.product_compare_choice);
product_router.get('/products/compare/:p1/:p2',product_controller.product_compare);

module.exports = product_router;

