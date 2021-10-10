const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ChatSchema = new Schema({
    room : { 
        type: Schema.Types.ObjectId, 
        ref: 'Room' 
    },
    nickname: { 
        type: String,
    },
    message: { 
        type: String,
    },
    created_date: { 
        type: Date, 
        default: Date.now 
    },
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;