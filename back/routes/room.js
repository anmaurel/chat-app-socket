const express = require('express');

const roomController = require('../controllers/room');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', roomController.getRooms);
router.get('/:id', auth, roomController.getRoom);
router.post('/add', auth, roomController.addRoom);
router.put('/update/:id', auth, roomController.updateRoom);
router.delete('/delete/:id', auth, roomController.deleteRoom);

module.exports = router;