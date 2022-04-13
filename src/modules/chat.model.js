const mongoose = require('mongoose');

const Chat = mongoose.model("Chat model",
    new mongoose.Schema({
        username: {
            type: String,
            min: 2,
            max: 10,
            required: true,
        },
        email: {
            type: String,
            min: 4,
            max: 50,
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 7
        },
        isAvaterImage: {
            type: Boolean,
            default: false
        },
        avaterImage: {
            type: String
        }
    })
)

const Messages = mongoose.model("Chat_messages",
    new mongoose.Schema({
        message: {
            text: {
                type: String,
                required: true
            },
            users: Array,
            sender: {   
                type: mongoose.Schema.Types.ObjectId,
                ref: "Chat model",
            }
        }
    }, {
        timestamps: true
    }))

const Posts = mongoose.model("Post_model",
    new mongoose.Schema({
        posts: {
            content: {
                type: String,
                required: true,
            },
            comments: {
                text: String,
                users: Array,
            },
            poster: {
                type: String,
                ref: "Chat model",
            }
        }
    }))

module.exports = {
    Chat,
    Messages,
    Posts
}