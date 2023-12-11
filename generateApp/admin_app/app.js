const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')


const app = express();
app.use(session({
secret: 'secret',
resave: true,
saveUninitialized: true
}));

// all environments
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// add views types and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// include ROUTES


const abonnement_router = require('./routes/abonnement');
app.use('/', abonnement_router);


const ads_router = require('./routes/ads');
app.use('/', ads_router);


const brand_router = require('./routes/brand');
app.use('/', brand_router);


const cart_router = require('./routes/cart');
app.use('/', cart_router);


const cart_p_router = require('./routes/cart_p');
app.use('/', cart_p_router);


const category_router = require('./routes/category');
app.use('/', category_router);


const customer_order_router = require('./routes/customer_order');
app.use('/', customer_order_router);


const delivery_price_router = require('./routes/delivery_price');
app.use('/', delivery_price_router);


const opinion_router = require('./routes/opinion');
app.use('/', opinion_router);


const order_p_router = require('./routes/order_p');
app.use('/', order_p_router);


const order_stat_router = require('./routes/order_stat');
app.use('/', order_stat_router);


const privilege_router = require('./routes/privilege');
app.use('/', privilege_router);


const product_router = require('./routes/product');
app.use('/', product_router);


const property_router = require('./routes/property');
app.use('/', property_router);


const property_p_router = require('./routes/property_p');
app.use('/', property_p_router);


const property_type_router = require('./routes/property_type');
app.use('/', property_type_router);


const shop_router = require('./routes/shop');
app.use('/', shop_router);


const status_router = require('./routes/status');
app.use('/', status_router);


const sub_category_router = require('./routes/sub_category');
app.use('/', sub_category_router);


const user_router = require('./routes/user');
app.use('/', user_router);


const user_shop_router = require('./routes/user_shop');
app.use('/', user_shop_router);


const wilaya_router = require('./routes/wilaya');
app.use('/', wilaya_router);


const user_default_router = require('./routes/user_default');
app.use('/', user_default_router);

const detail_router = require('./routes/details');
app.use('/', detail_router);

const product_details_router = require('./routes/product_details');
app.use('/', product_details_router);


// include APIs


const abonnement_api = require('./routes/abonnement_api');
app.use('/api', abonnement_api);


const ads_api = require('./routes/ads_api');
app.use('/api', ads_api);


const brand_api = require('./routes/brand_api');
app.use('/api', brand_api);


const cart_api = require('./routes/cart_api');
app.use('/api', cart_api);


const cart_p_api = require('./routes/cart_p_api');
app.use('/api', cart_p_api);


const category_api = require('./routes/category_api');
app.use('/api', category_api);


const customer_order_api = require('./routes/customer_order_api');
app.use('/api', customer_order_api);


const delivery_price_api = require('./routes/delivery_price_api');
app.use('/api', delivery_price_api);


const opinion_api = require('./routes/opinion_api');
app.use('/api', opinion_api);


const order_p_api = require('./routes/order_p_api');
app.use('/api', order_p_api);


const order_stat_api = require('./routes/order_stat_api');
app.use('/api', order_stat_api);


const privilege_api = require('./routes/privilege_api');
app.use('/api', privilege_api);


const product_api = require('./routes/product_api');
app.use('/api', product_api);


const property_api = require('./routes/property_api');
app.use('/api', property_api);


const property_p_api = require('./routes/property_p_api');
app.use('/api', property_p_api);


const property_type_api = require('./routes/property_type_api');
app.use('/api', property_type_api);


const shop_api = require('./routes/shop_api');
app.use('/api', shop_api);


const status_api = require('./routes/status_api');
app.use('/api', status_api);


const sub_category_api = require('./routes/sub_category_api');
app.use('/api', sub_category_api);


const user_api = require('./routes/user_api');
app.use('/api', user_api);


const user_shop_api = require('./routes/user_shop_api');
app.use('/api', user_shop_api);


const wilaya_api = require('./routes/wilaya_api');
app.use('/api', wilaya_api);

const apis = require('./routes/apis');
app.use('/api', apis);

const user_default_api = require('./routes/user_default_api');
app.use('/api', user_default_api);

const detail_api = require('./routes/details');
app.use('/api', detail_api);

const product_details_api = require('./routes/product_details_api');
app.use('/api', product_details_api);



console.log('http://localhost:5800');
app.listen(5800);