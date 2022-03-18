const { Chat, Messages } = require('../modules/chat.model')
const encrypt = require('bcryptjs')
const { sign } = require('jsonwebtoken')
require('dotenv').config()
var TOKEN_SECRET = process.env.TOKEN_SECRET

getToken = (user) => {
    return sign({ id: user._id, username: user.username }, TOKEN_SECRET, {});
};

const chatAuth = (req, res) => {
    Chat.findOne({ username: req.body.username }).then(
        user => {
            if (user) return res.status(400).json({ message: "This username is taken!", status: false })

            var user = new Chat({
                username: req.body.username,
                email: req.body.email,
                password: encrypt.hashSync(req.body.password, 10)
            });
            user.save();
            return res.status(201).json({ status: true, data: user })
        }
    ).catch(err => {
        return res.status(400).send(err)
    })
}

const chatSignIn = (req, res) => {
    Chat.findOne({ username: req.body.username }).then(
        user => {
            if (!user) return res.status(400).json({ status: false, message: "This user cannot be found" })
            var verifiedPassword = encrypt.compareSync(req.body.password, user.password)

            if (!verifiedPassword) return res.status(400).json({ status: false, message: "This user's detail has a wrong parameter" })

            //     var token = getToken(user)
            // console.log(token)
            return res.status(201).json({ status: true, data: user })
        }
    ).catch(err => { return res.status(400).json({ status: false, err: err }) })
}

const users = async (req, res) => {
    try {
        const chat = await Chat.find({ _id: { $ne: req.params.id } }).select([
            "email", "username", "avaterImage", "_id",
        ]);

        return res.status(200).json({ data: chat })
    } catch (error) {
        return res.status(400).json({ status: false, error })
    }
}

const addMessage = async (req, res) => {
    try {
        const body = req.body;
        const data = await Messages.create({
            message: {
                text: body.message,
                users: [body.from, body.to],
                sender: body.from,
            }
        });
        if (data) return res.status(201).json({ data: data, msg: "Message sent successfully" })
        return res.status(400).json({ msg: "Failed to send" })
    } catch (err) {
        return res.status(400).json(err);
    }
}

const getMessages = async (req, res) => {
    try {
        const { from, to } = req.body;
        const messages = await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        const newMessages = messages.map((msg) => {
            return {
                fromUser: msg.message.sender.toString() === from,
                message: msg.message.text,
            }
        })
        return res.status(200).json(newMessages)
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    chatAuth,
    chatSignIn,
    users,
    addMessage,
    getMessages
}