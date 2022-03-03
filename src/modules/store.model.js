const mongoose = require('mongoose')
const Store = mongoose.model(
    "Store",
    new mongoose.Schema(
        {
            title: { type: String, required: true },
            description: { type: String },
            image: { type: String },
            link: { type: String },
            category: { type: String, required: true },
            type: { type: String },
            userId: { type: mongoose.Types.ObjectId }
        },
        {
            timestamps: true,
        }
    )
);

module.exports = {
    Store
}