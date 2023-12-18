const express = require('express');
const user_router = express.Router();


// MY CONTROLLER
const user_controller = require("../controller/user")
const authentication_controller = require('../../admin_app/controller/authentication');


user_router.get('/signup',user_controller.signup);
user_router.post('/signup',user_controller.signup_save);


user_router.get('/confirm/email',user_controller.confirm_email);
user_router.post('/confirm/email',user_controller.confirm_email_valid);


user_router.get('/login',user_controller.login);
user_router.post('/login',user_controller.login_check);


user_router.get('/logout',user_controller.logout);


user_router.get('/account',authentication_controller.isAuthenticated,user_controller.account_edit);
user_router.post('/account',authentication_controller.isAuthenticated,user_controller.account_edit_save);



module.exports = user_router;

