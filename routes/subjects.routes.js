const { Router } = require('express');
const { addSubjects, getSubjects } = require('../src/controllers/subjects.controller');

const router = Router();

router.post('/', addSubjects)
router.get('/', getSubjects)

module.exports.subjectsRouter = router