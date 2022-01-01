const indexRoutes = require('express').Router(),
indexController = require('../controllers/indexController'),
{validateInputs,checkInput,saveValidUser, redirectView} = require("../controllers/regController");

indexRoutes.get('/',indexController.home);
indexRoutes.get('/categories',indexController.categories);
indexRoutes.get('/signup',indexController.signUp)
.post('/signup',checkInput,validateInputs,saveValidUser,redirectView);


module.exports = indexRoutes;