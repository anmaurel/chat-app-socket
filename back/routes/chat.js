const express = require('express');

const chatController = require('../controllers/chat');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/:roomid', chatController.getChats);
router.get('/:id', auth, chatController.getChat);
router.post('/add', auth, chatController.addChat);
router.put('/update/:id', auth, chatController.updateChat);
router.delete('/delete/:id', auth, chatController.deleteChat);

module.exports = router;