const express = require('express');
const router = express.Router();

// MY MODULES

// MY CONTROLLERS
const band_controller = require("../controller/brand")

// router.get('/', function (req, res) {
//   res.render('home');
// });

// router.get('/product', function (req, res) {
//   res.render('product');
// });

router.get('/brands/list',band_controller.brand_list);

// router.get('/products', function (req, res) {
//   res.render('products');
// });


router.get('/contact', function (req, res) {
  res.render('contact',{session : req.session});
});
// router.get('/checkout', function (req, res) {
//   res.render('checkout');
// });
/* router.get('/cart', function (req, res) {
  res.render('cart',{session : req.session});
}); */

router.get('/order_details', function (req, res) {
  res.render('order_details',{session : req.session});
});

router.get('/success/checkout', function (req, res) {
  res.render('checkout_success',{session : req.session});
});






module.exports = router;
