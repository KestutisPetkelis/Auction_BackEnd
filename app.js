const express = require("express")  // serveris

const app = express()
const mongoose = require("mongoose") // duomenu baze Mongoose
const session = require("express-session") // sesijos
require('dotenv').config()

app.use(express.json()) ///Butinai reikia isideti, kad pasiimtu duomenis is req.body

app.listen(4000)   // klausom porto: pvz.: 4000

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,    //  pasiimam is .env failo reiksme
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const router = require("./routes/main")
app.use("/", router)

mongoose.connect(process.env.MONGO_KEY)  // pasiimam is .env failo reiksme
.then(res=>{
    console.log("connection good")
}).catch(e =>{
    console.log(e)
})