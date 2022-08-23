const mongoose = require('mongoose');
const { isEmail } = require('validator')

const signUpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Enter Email'],
        unique: [true, 'This email is already in use'],
        trim: true,
        validate: [isEmail , 'Not a correct email']
    },
    password: {
        type: String,
        required: [true, 'Enter password'],
        minlength: [5, 'minimum password length is 5'],
    }
}, {timestamps: true})

module.exports = mongoose.model('User', signUpSchema)
//Then import in Controllers