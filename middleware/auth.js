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

// to check current user that is logged in
const checkCurrentUser = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.MY_SECRET, async (err, decodedToken)=>{
            if(err){
                res.locals.user = null
                next()
            } else{
                const user = await users.findById(decodedToken.id)
                res.locals.user = user;
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}

module.exports = {requiredAuthProcess, checkCurrentUser}