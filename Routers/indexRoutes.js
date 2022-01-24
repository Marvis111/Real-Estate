const { isAuthUserNotPermitted } = require('../controllers/authController');

const indexRoutes = require('express').Router(),
indexController = require('../controllers/indexController'),
{validateInputs,checkInputs,ValidatedUser, redirectView} = require("../controllers/regController");

indexRoutes.get('/',indexController.home);
indexRoutes.get('/categories',indexController.categories);
indexRoutes.get('/signup',isAuthUserNotPermitted,indexController.signUp);
indexRoutes.post('/signup',checkInputs,validateInputs,ValidatedUser,redirectView);


module.exports = indexRoutes;