const mongoose = require('mongoose');

const Room = mongoose.model('Room');

exports.getRooms = (req, res) => {
    Room.find()
        .then((rooms) => {
            res.status(200).send(rooms);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving rooms.',
            });
        });
};

exports.getRoom = (req, res) => {
    let id = req.params.id;

    Room.findById(id)
        .then((rooms) => {
            res.status(200).send(rooms);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving room.',
            });
        });
};

exports.addRoom = (req, res, next) => {
    const room = new Room(req.body);

    room.save(room)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Room.',
            });
        });
};

exports.updateRoom = (req, res) => {
    let id = req.params.id;

    Room.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
    )
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Room with id=${id}.`,
                });
            } else res.send({ message: 'Room was updated successfully.' });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.deleteRoom = (req, res) => {
    let id = req.params.id;

    Room.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Room with id=${id}.`,
                });
            } else {
                res.send({
                    message: 'Room was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};
