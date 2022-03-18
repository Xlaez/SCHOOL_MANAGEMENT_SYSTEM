const { Users, Assignment, Result, Drafts } = require("../modules/app.model");
const encrypt = require('bcryptjs')
require("dotenv").config();
var JUNIOR_ID = process.env.ID_JUNIORCLASS
var SENIOR_ID = process.env.ID_SENIORCLASS
var SENIOR1 = process.env.ID_SENIOR1
var SENIOR2 = process.env.ID_SENIOR2
var SENIOR3 = process.env.ID_SENIOR3
var JUNIOR1 = process.env.ID_JUNIOR1
var JUNIOR2 = process.env.ID_JUNIOR2
var JUNIOR3 = process.env.ID_JUNIOR3
var TEACHER_J_1 = process.env.ID_TEACHER_JUNIOR1
var TEACHER_J_2 = process.env.ID_TEACHER_JUNIOR2
var TEACHER_J_3 = process.env.ID_TEACHER_JUNIOR3
var TEACHER_S_1 = process.env.ID_TEACHER_SENIOR1
var TEACHER_S_2 = process.env.ID_TEACHER_SENIOR2
var TEACHER_S_3 = process.env.ID_TEACHER_SENIOR3
const createDrafts = async (req, res) => {
    const id = req.get('userAccess');
    const body = req.body;
    var draft = new Drafts({
        header: body.header,
        // content: encrypt.hashSync(body.content, 7),
        content:body.content,
        userId: id
    })
    draft = await draft.save();
    try {
        return res.status(201).json({ message: "Document added to Drafts", data: draft })
    } catch (error) {
        return res.status(400).json(err)
    }
}

const fetchDrafts = (req, res) => {
    const id = req.get('userAccess')
    Drafts.findOne({ userId: id }).then(
        drafts => {
            if (!drafts) return res.status(400).send("You don't have any drafts")
            return res.status(200).json({ data: drafts })
        }
    ).catch(err => { return res.status(400).json(err) });
}

const editDrafts = async (req, res) => {
    const { id } = req.params;
    const body = req.body
    await Drafts.findByIdAndUpdate(id, body);
    return res.status(201).send('Successfully updated your draft');
}

const deleteDrafts = async (req, res) => {
    await Drafts.findByIdAndDelete(req.params.id);
    return res.status(201).send('Deleted document form your drafts');
}

const uploadUsersInfo = (req, res) => {
    const body = req.body;
    const file = req.file;
    const { id } = req.params;

    if (!file) return res.status(400).json({ message: "FIle type not supported or too large" });
    let updatedUserInfo;
    Users.findById(id).then(

        student => {
            let teacherId;
            let sectionId;
            let classId;
            if (body.class === 'junior1' || body.class == 'junior2' || body.class === 'junior3') {
                sectionId = JUNIOR_ID
                classId = JUNIOR_ID
                if (body.class === 'junior1') {
                    classId = classId.concat(JUNIOR1)
                    teacherId = TEACHER_J_1
                } else if (body.class === 'junior2') {
                    classId = classId.concat(JUNIOR2)
                    teacherId = TEACHER_J_2
                } else if (body.class === 'junior3') {
                    teacherId = TEACHER_J_3
                    classId = classId.concat(JUNIOR3)
                }
            }
            if (body.class === 'senior1' || body.class == 'senior2' || body.class == 'senior3') {

                sectionId = SENIOR_ID
                classId = SENIOR_ID
                if (body.class === 'senior1') {
                    teacherId = TEACHER_S_1
                    classId = classId.concat(SENIOR1)
                } else if (body.class === 'senior2') {
                    teacherId = TEACHER_S_2
                    classId = classId.concat(SENIOR2)
                } else if (body.class === 'senior3') {
                    teacherId = TEACHER_S_3
                    classId = classId.concat(SENIOR3)
                }
            }
            var preDetails = {
                fullname: student.fullname,
                email: student.email,
                password: student.password,
            };
            updatedUserInfo = ({
                fullname: preDetails.fullname,
                email: preDetails.email,
                password: preDetails.password,
                image: file.path,
                classId: classId,
                sectionId: sectionId,
                userId: id,
                teacherId: teacherId,
                ...body,
            })
        }

    ).then(
        result => {
            Users.findByIdAndUpdate(id, updatedUserInfo).then(
                result => {
                    return res.status(201).json({ data: result })
                }
            )
        }
    ).catch(err => {
        return res.status(400).json(err)
    })

};

//EDIT STUDENTS DATA
const editUserInfo = async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    var users = await Users.findByIdAndUpdate(id, body)
    try {
        return res.status(201).json({ message: "Successful!", data: users })
    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = {
    uploadUsersInfo,
    editUserInfo,
    createDrafts,
    fetchDrafts,
    editDrafts,
    deleteDrafts
}