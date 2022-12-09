const express = require('express');
const router = express.Router();

const workstationController = require('../app/controllers/WorkstationController');

router.post('/create', workstationController.create);
router.post('/update', workstationController.update);
router.post('/delete', workstationController.delete);
router.post('/change-status', workstationController.changeStatus);
router.get('/find',workstationController.findAll)
router.get('/', workstationController.findOne);

module.exports = router;
