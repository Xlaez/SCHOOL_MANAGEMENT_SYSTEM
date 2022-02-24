const { Users } = require("../src/modules/app.model");

// var role = req.body;

const grantAccess = (req, res, next) => {
    const userId = req.get('userId')
    Users.findOne({ _id: userId }).then(
        data => {
            console.log(data)
            if (!data) return res.status(400).json({ message: "Something went wrong!" })
            var roleAdmin = data.role;
            if (roleAdmin === 'admin') {
                return next();
            }
            res.status(400).json({ message: "You are not an admin" })

        }
    ).catch(
        err => {
            return res.status(400).json(err);
        }
    )
}

module.exports = {
    grantAccess
}