const { Subjects } = require("../modules/app.model")

const addSubjects = async (req, res) => {
    const body = req.body;
    const userId = req.get("user-access");
    var subjects = new Subjects({
        ...body,
        userId: userId
    })
    subjects = await subjects.save();
    try {
        return res.status(201).json({ data: subjects });
    } catch (error) {
        res.status(400).send(error)
    }
}

const getSubjects = (req, res) => {
    const userId = req.get("user-access")
    Subjects.findOne({ userId: userId }).then(result => {
        if (!result) return res.status(400).send("An error occured while fetching your subjects combination")
        return res.status(200).json({ data: result })
    }).catch(err => { return res.status(400).send(err) })
}

module.exports = {
    addSubjects,
    getSubjects
}