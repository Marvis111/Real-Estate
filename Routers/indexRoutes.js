const indexRoutes = require('express').Router(),
indexController = require('../controllers/indexController'),
{validateInputs,checkInputs,ValidatedUser, redirectView} = require("../controllers/regController");

indexRoutes.get('/',indexController.home);
indexRoutes.get('/categories',indexController.categories);
indexRoutes.get('/signup',indexController.signUp);
indexRoutes.post('/signup',checkInputs,validateInputs,ValidatedUser,redirectView);


module.exports = indexRoutes;