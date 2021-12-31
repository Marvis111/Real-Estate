const indexRoutes = require('express').Router(),
indexController = require('../controllers/indexController'),
catController = require('../controllers/catController')

indexRoutes.get('/',indexController.home);
indexRoutes.get('/categories',indexController.categories);
module.exports = indexRoutes;