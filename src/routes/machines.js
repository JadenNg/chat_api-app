const express = require('express');
const router = express.Router();

const machineController = require('../app/controllers/MachineController');

router.post('/create', machineController.create);
router.post('/update', machineController.update);
router.post('/delete', machineController.delete);
router.post('/change-status', machineController.changeStatus);
router.get('/find',machineController.findAll)
router.get('/', machineController.findOne);

module.exports = router;
