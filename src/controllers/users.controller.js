const { Users, Assignment, Result, Drafts } = require("../modules/app.model");

const createDrafts = async (req, res) => {
    const { body, id } = req.body;
    var draft = new Drafts({
        ...body,
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
    const { id } = req.params;
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

module.exports = {
    createDrafts,
    fetchDrafts,
    editDrafts,
    deleteDrafts
}