const jwt = require('jsonwebtoken')
const users = require('../models/signup')

const requiredAuthProcess = ( req , res , next )=>{
    //get that jwt
    const token = req.cookies.jwt
    //check if it exists
    if(token){
        //verify
        jwt.verify(token, process.env.MY_SECRET, (err, decodedToken)=>{
            if(err){
                res.redirect('/login')
            }else{
                next()
            }
        })
    }else{
        res.redirect('/login')
    }
    //verify

}

module.exports = requiredAuthProcess