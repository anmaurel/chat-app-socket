const mongoose = require('mongoose')
const uniValid = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String, 
        require:true, 
        unique: true
    },
    password: {
        type: String, 
        require:true
    }
});

UserSchema.plugin(uniValid);

const User = mongoose.model('User', UserSchema);

module.exports = User;