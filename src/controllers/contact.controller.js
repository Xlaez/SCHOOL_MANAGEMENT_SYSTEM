const { Contact } = require("../modules/contact.model")

const fetchComplaints = (req, res) => {
    Contact.find().sort({
        createdAt: "desc",
    }).then(
        data => {
            return res.status(200).json({ data: data })
        }
    ).catch(err => { return res.status(400).json(err) })
}

const makeComplaints = async (req, res) => {
    const body = req.body;
    var contact = await new Contact({
        ...body
    })
    contact = await contact.save()
    try {

        return res.status(201).json({ data: contact });
    }
    catch (err) {
        return res.status(400).json(err);
    }
}

const deleteComplaints = async (req, res) => {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    return res.status(201).json({ message: 'Successfuly deleted' })
}

module.exports = {
    fetchComplaints,
    makeComplaints,
    deleteComplaints
}