const { Router } = require("express");
const { createDrafts, fetchDrafts, editDrafts, deleteDrafts } = require("../src/controllers/users.controller");

const router = Router();

router.post('/drafts', createDrafts);
router.get('/drafts', fetchDrafts);
router.put('/drafts/:id', editDrafts);
router.delete('/drafts/:id', deleteDrafts);


module.exports.userRouter = router;
