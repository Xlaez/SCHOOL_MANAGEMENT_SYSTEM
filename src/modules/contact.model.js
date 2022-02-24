const mongoose = require('mongoose');

const Contact = mongoose.model(
    "School_Contact",
    new mongoose.Schema({
        name: { type: String, required: [true, 'Enter a valid name character'] },
        email: { type: String, required: [true, 'Enter a valid email address'] },
        ward: { type: String },
        complaint: { type: String, required: true }
    }, {
        timestamps: true
    })
);

module.exports = {
    Contact
}