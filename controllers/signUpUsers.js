const users = require('../models/signup');
const bcrypt = require('bcrypt');

//async/await
//trycatch

const registerUser = async(req, res) =>{
    //req.body
    //if there is no req.body
    //check if the email is already existing
    //user already exists
    //protect users password
    //create that user

    const { email, password } = req.body

    //if there is no req.body
    if(!email || !password){
        return res.status(401).json({msg: 'Provide all the necessary inputs'})
    }
    
    //check if the email is already existing
    const userExists = await users.findOne({email})
    if(userExists){
        return res.status(400).json({msg: 'User already exists'})
    }

    //protect users password - hashing and salting
    console.log(password);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword);

    try {
        const  user = await users.create({
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            msg: 'successful',
            data: user
        })
    } catch (error) {
        res.status(500).json({msg: 'Invalid user data, try again'})
    }
}

const loginUser = async(req,res) =>{
    //login details- eamil, password - req.body
    //find email -- existing
    //is email existing? - then compare passwords
    //incorrect
    //Users

    const { email, password } = req.body

    //If email or password not provided
    if(!email || !password){
        return res.json({ msg: 'Please provide the necssary Login details'})
    }

    //find email -- existing
    const user = await users.findOne({ email })
    if(!user){
        return res.status(404).json({msg: "User not found, Please sign up"})
    }

    //is email existing? - then compare passwords
    if(user.email === email && (await bcrypt.compare(password, user.password))){
        res.status(200).json({msg : "Login Successful", data : user })
    }else{
        res.status(201).json({ msg : "Invalid Password, try again", redirect : "/"})
    }
    console.log(`${user.email} just logged in`);
}

const renderIndexPage = (req,res)=>{
    res.render('index')
}

const renderLoginPage = (req, res)=>{
    res.render('login')
}

module.exports = { registerUser, loginUser, renderIndexPage, renderLoginPage }