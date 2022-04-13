const { Router } = require('express')
const router = Router();
const { getCheckout } = require('../src/controllers/test.controller');
router.get('/', getCheckout)

module.exports.testRoute = router;