const { Users } = require("../src/modules/app.model")


const isSuspended = (req, res, next) => {
    var userAccess = req.get("user-access")
    Users.find({ _id: userAccess }).then(
        user => {
            if (user.suspended) {
                return res.status(403).send("You are still on suspension.")
            } else {
                next()
            }
        }
    ).catch(err => {
        return res.status(400).send("An error has occured")
    })
}

module.exports = {
    isSuspended
}