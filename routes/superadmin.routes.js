const { Router } = require('express');
const { fetchAdmins } = require('../src/controllers/superadmin.controller');

const router = Router();

router.get('/admin', fetchAdmins)

module.exports.superAdminRoute = router