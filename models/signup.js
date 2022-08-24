const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require("bcrypt")

//MONGOOSE VALIDATION
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
}, {timestamps: true});

//MONGOOSE HOOKS
//function that fires after we save(Post)

// signUpSchema.post('save', (doc,next)=>{
    // console.log(doc);
    // next()
// })

//function that fire before we save(Pre)

//hashing the password
signUpSchema.pre('save', async function(next){
    //gen salt
    const salt = await bcrypt.genSalt()
    //hash and salt
    this.password = await bcrypt.hash(this.password, salt)
    next()
})



module.exports = mongoose.model('User', signUpSchema)
//Then import in Controllers