const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let RoomSchema = new Schema({
    room_name: { 
        type: String,
        unique: true,
        requied: true,
    },
    created_date: {
        type: Date, 
        default: Date.now 
    },
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;