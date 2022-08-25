const users = require('../models/signup');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//handling errors
const handleErrors = (err) => {
    let error = { email: "", password: "" }

    // every error message comes with ( err.message, err.code an so on)
    // Error message for our login
    if(err.message === 'incorrect email'){
        error.email = 'This email is not registered yet'
    }
    if(err.message === 'incorrect password'){
        error.password = 'This password is Incorrect, try again'
    }

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(( {properties} )=>{
            error[properties.path] = properties.message
        })
    }
    return error;
}

//auth jwt
//headers // payload // signature (seconds)

//use createToken in (login_post)
const createToken = (id) =>{
    return jwt.sign({ id }, process.env.MY_SECRET, { expiresIn: 24 * 60 * 60 })
}


const renderIndexPage = (req,res)=>{
    res.render('index')
}

const renderLoginPage = (req, res)=>{
    res.render('login')
}

const renderDashboard = (req, res)=>{
    res.render("dashboard")
}

//handling errors
const signup_post = async (req,res)=>{
    //email and password
    const { email, password } = req.body
    try {
        const user = await users.create({ email, password })
        res.status(201).json({ user, redirect: '/login'})
    } catch (error) {
        const errors = handleErrors(error)
        res.status(404).json({ errors })
    }
}

const login_post = async (req, res)=>{
    const { email, password } = req.body;
    try {
        // find user with the email
        const theUser = await users.findOne({ email })
        if( theUser ){
            const correctPassword = await bcrypt.compare(password, theUser.password)
            if(correctPassword){
                // create token
                const token = createToken(theUser._id)
                //store token inside a cookie
                const time = 24 * 60 * 60 * 1000
                res.cookie('jwt', token, { maxAge: time })
                return res.status(200).json({ theUser, redirect: '/dashboard' }) //make sure there is a "return" so the code would not develop an error
                // res.redirect('/dashboard')
            }
            throw Error('incorrect password')
        }
        throw Error('incorrect email')
    } catch (error) {
        const errors = handleErrors(error)
        res.status(404).json({ errors })
    }
}

//logout function
const logout = (req, res)=>{
    res.cookie("jwt", '', {maxAge: 1000})
    res.redirect('/login')
}

module.exports = { renderIndexPage, renderLoginPage, signup_post, renderDashboard, login_post, logout }