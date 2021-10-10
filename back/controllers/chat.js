const mongoose = require('mongoose');

const Chat = mongoose.model('Chat');

exports.getChats = (req, res) => {
    Chat.find({ room: req.params.roomid })
        .then((chats) => {
            res.status(200).send(chats);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving chats.',
            });
        });
};

exports.getChat = (req, res) => {
    let id = req.params.id;

    Chat.findById(id)
        .then((chats) => {
            res.status(200).send(chats);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving chat.',
            });
        });
};

exports.addChat = (req, res, next) => {
    const chat = new Chat(req.body);

    chat.save(chat)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Chat.',
            });
        });
};

exports.updateChat = (req, res) => {
    let id = req.params.id;

    Chat.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
    )
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Chat with id=${id}.`,
                });
            } else res.send({ message: 'Chat was updated successfully.' });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.deleteChat = (req, res) => {
    let id = req.params.id;

    Chat.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Chat with id=${id}.`,
                });
            } else {
                res.send({
                    message: 'Chat was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};
