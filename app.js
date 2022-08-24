require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./db/connect')
app.set("view engine", "ejs")
// const signUpRouter = require('./routes/signUpUsers')
const newRouter = require('./routes/newSignUp')
const cookieParser = require('cookie-parser')

app.use(express.urlencoded({ extended: true }))
//to pass informatin in json(middleware to parse json)
app.use(express.json())
// middleware for cookie parser
app.use(cookieParser())

//This middleware is from the Router
// app.use(signUpRouter)
app.use(newRouter)



//database connection
connectDB(process.env.MONGO_URL)
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`Listening on port ${port} with database connected`)
        })
    })
    .catch((err)=>console.log(err))



app.get('/create-cookies', (req, res)=>{
    res.setHeader('Set-Cookie', 'currentUser = true')
    res.cookie('currentUser', false)
    // when setting a cookie, you pass in three arguments (name, value, options object {age(when the cookie expires), secure, httpOnly})
    res.cookie("admin", false)
    // createToken(id)
    // res.cookie('jwt', token, {maxAge})
    res.cookie("notAdmin" , true, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
    })

})

app.get('/get-cookies', (req,res)=>{
    const cookies = req.cookies;
    res.json(cookies)
})




app.use("*", (req,res)=>{
    res.render('error')
})