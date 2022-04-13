const { Router } = require("express");
const { createDrafts, fetchDrafts, editDrafts, deleteDrafts, uploadUsersInfo, editUserInfo, fetchStudentsData, editStudentImage } = require("../src/controllers/users.controller");

const router = Router();

router.post('/drafts', createDrafts);
router.get('/drafts', fetchDrafts);
router.put('/drafts/:id', editDrafts);
router.delete('/drafts/:id', deleteDrafts);
router.post('/upload/:id', uploadUsersInfo);
router.put('/upload/:id', editUserInfo)
router.put('/user/:id', editStudentImage);
router.get('/user/:id', fetchStudentsData)

module.exports.userRouter = router;
