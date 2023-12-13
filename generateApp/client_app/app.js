// Modules
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

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

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../admin_app/public')));




// include ROUTES & APIs
const routes = require('./routes/router');
const apis = require('./routes/apis');

app.use('/', routes);
app.use('/api', apis);




const home_router = require('./routes/home');
app.use('/', home_router);

const product_router = require('./routes/product');
app.use('/', product_router);

const order_router = require('./routes/customer_order');
app.use('/', order_router);

const user_router = require('./routes/user');
app.use('/', user_router);


const cart_router = require('./routes/cart');
app.use('/', cart_router);



console.log('http://localhost:3300');
app.listen(3300);
