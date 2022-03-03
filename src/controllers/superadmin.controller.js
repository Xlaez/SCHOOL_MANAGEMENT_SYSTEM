const { Users } = require("../modules/app.model");

var adminSpec = 'admin'
const fetchAdmins = async (req, res) => {

    const admin = await Users.find({ role: adminSpec });
    try {
        return res.status(201).json({ data: admin })
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    fetchAdmins
}