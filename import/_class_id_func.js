require("dotenv").config();
var JUNIOR_ID = process.env.ID_JUNIORCLASS
var SENIOR_ID = process.env.ID_SENIORCLASS
var SENIOR1 = process.env.ID_SENIOR1
var SENIOR2 = process.env.ID_SENIOR2
var SENIOR3 = process.env.ID_SENIOR3
var JUNIOR1 = process.env.ID_JUNIOR1
var JUNIOR2 = process.env.ID_JUNIOR2
var JUNIOR3 = process.env.ID_JUNIOR3



let sectionId;
let classId;
const checkForClass = function (body) {
    if (body.class === 'junior1' || body.class == 'junior2' || body.class === 'junior3') {
        sectionId = JUNIOR_ID
        classId = JUNIOR_ID
        if (body.class === 'junior1') {
            classId = classId.concat(JUNIOR1)
        } else if (body.class === 'junior2') {
            classId = classId.concat(JUNIOR2)
        } else if (body.class === 'junior3') {
            classId = classId.concat(JUNIOR3)
        }
    }
    if (body.class === 'senior1' || body.class == 'senior2' || body.class == 'senior3') {
        sectionId = SENIOR_ID
        classId = SENIOR_ID
        if (body.class === 'senior1') {
            classId = classId.concat(SENIOR1)
        } else if (body.class === 'senior2') {
            classId = classId.concat(SENIOR2)
        } else if (body.class === 'senior3') {
            classId = classId.concat(SENIOR3)
        }
    }
}
module.exports = {
    checkForClass
}