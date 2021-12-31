const catRoutes = require('express').Router(),
catController = require('../controllers/catController');

catRoutes.get('/realestates',catController.realEstates);

module.exports = catRoutes;