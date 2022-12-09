const express = require('express');
const router = express.Router();

const room = require('../app/controllers/RoomController');

router.post('/create', room.create);
router.post('/update', room.update);
router.post('/delete', room.delete);
router.get('/find',room.findAll)
router.get('/', room.findOne);

module.exports = router;
