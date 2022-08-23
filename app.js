require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./db/connect')
app.set("view engine", "ejs")
const signUpRouter = require('./routes/signUpUsers')

app.use(express.urlencoded({ extended: true }))
//to pass informatin in json(middleware to parse json)
app.use(express.json())
//This middleware is from the Router
app.use(signUpRouter)

//database connection
connectDB(process.env.MONGO_URL)
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`Listening on port ${port} with database connected`)
        })
    })
    .catch((err)=>console.log(err))



app.use("*", (req,res)=>{
    res.render('error')
})