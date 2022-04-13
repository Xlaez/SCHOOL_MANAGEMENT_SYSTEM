const { Router } = require('express')

const router = Router();
const { chatAuth, chatSignIn, users, addMessage, getMessages, storePosts } = require('../src/controllers/chat.controller')

router.post('/', chatAuth)
router.post('/signin', chatSignIn)
router.get('/users/:id', users)
router.post('/add', addMessage)
router.post('/get', getMessages)
router.post('/posts', storePosts);

module.exports.chatRoute = router