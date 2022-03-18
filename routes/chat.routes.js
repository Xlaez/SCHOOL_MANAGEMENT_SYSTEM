const { Router } = require('express')

const router = Router();
const { chatAuth, chatSignIn, users, addMessage, getMessages } = require('../src/controllers/chat.controller')

router.post('/', chatAuth)
router.post('/signin', chatSignIn)
router.get('/users/:id', users)
router.post('/add', addMessage)
router.post('/get', getMessages)

module.exports.chatRoute = router