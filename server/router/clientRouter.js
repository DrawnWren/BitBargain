const router = require('express').Router();
const itemController = require('../controllers/itemController');
// const userController = require('../controllers/userController');
const transController = require('../controllers/transactionsController');
const search = require('../search/search.js');
const passport = require('passport');
const images = require('../controllers/imageController');

// General Routes for nothing specific
router
  .get('/items/categories', itemController.getCategories)
  .get('/items/:id', itemController.getItem)
  .post('/items/:id/buy', itemController.buyItem)
  .get('/items/:id/confirm', itemController.boughtConfirmation)
  .post('/items/sell', itemController.sellItem)
  .get('/disputes', itemController.getDisputes)
  .post('/disputes', itemController.resolveDisputes)
  .post('/disputes/:id', itemController.startDispute)
  .get('/items/:id/:email/transaction', transController.findUserRole)

// Images Routes
  .post('/image', images.addImage);

// Search routes
router
  .get('/api/search/:q/:cat?', search);

module.exports = router;
