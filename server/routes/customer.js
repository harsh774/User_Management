const express = require('express');
const router = express.Router();
const customerController = require('../controllers/cutomerController');

/**
 * Customer Routes
 */

router.get('/', customerController.homepage);
router.get('/add', customerController.addCustomer);

module.exports = router;
