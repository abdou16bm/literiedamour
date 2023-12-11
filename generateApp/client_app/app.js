// Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// all environments
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// add views types and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../admin_app/public')));

// include ROUTES & APIs
const routes = require('./routes/router');

app.use('/', routes);

const home_router = require('./routes/home');
app.use('/', home_router);

const product_router = require('./routes/product');
app.use('/', product_router);

const order_router = require('./routes/customer_order');
app.use('/', order_router);




const apis = require('./routes/apis');
app.use('/api', apis);

console.log('http://localhost:3300');
app.listen(3300);
