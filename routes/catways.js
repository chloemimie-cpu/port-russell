const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

router.use('/:id/reservations', require('./reservations'));

router.get('/', catwayController.getAllCatways);
router.get('/:id', catwayController.getCatwayById);
router.post('/', catwayController.createCatway);
router.put('/:id', catwayController.updateCatwayState);
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;