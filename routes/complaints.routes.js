const { Router } = require("express");
const { fetchComplaints, makeComplaints, deleteComplaints } = require("../src/controllers/contact.controller");
const router = Router();

router.get('/', fetchComplaints);
router.post('/', makeComplaints);
router.delete('/:id', deleteComplaints)

module.exports.complaintsRouter = router;
