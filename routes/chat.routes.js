const { Router } = require('express')

const router = Router();
const { chatAuth, chatSignIn, users , addMessage} = require('../src/controllers/chat.auth.controller')

router.post('/', chatAuth)
router.post('/signin', chatSignIn)
router.get('/users/:id', users)
router.post('/add', addMessage)

module.exports.chatRoute = router