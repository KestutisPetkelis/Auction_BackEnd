const express = require("express")  // serveris

const app = express()
const mongoose = require("mongoose") // duomenu baze Mongoose
const session = require("express-session") // sesijos
const schedule = require('node-schedule')
require('dotenv').config()

app.use(express.json()) ///Butinai reikia isideti, kad pasiimtu duomenis is req.body

// const cors = require("cors")
// app.use(cors())
const http= require('http').createServer(app)

const io = require('socket.io')(http,{
    cors:{
        origin: "http://localhost:3000"
    }
})

//app.listen(4000)   // klausom porto: pvz.: 4000

http.listen(4000, () =>{
    console.log("Listen on port 4000")
})

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
const { json } = require("express")
app.use("/", router)


mongoose.connect(process.env.MONGO_KEY)  // pasiimam is .env failo reiksme
.then(res=>{
    console.log("connection good")
}).catch(e =>{
    console.log(e)
})

const newUserModel= require("./models/newUserSchema")
const auctionModel= require("./models/auctionSchema")

async function showAll(){
    const all = await auctionModel.find({time:{ $gte: Date.now() }})
    console.log(all.length)
}

let i =1
showAll()


const thisJob = schedule.scheduleJob('*/1 * * * * *', ()=>{
    
    showAll()
    console.log(" schedules veikimas "+i)
    i++
    if(i>10){
        thisJob.cancel()
        console.log(" schedules veikimas baigesi ")
    }
})

io.on("connection", socket =>{
     console.log("socket connected...", "User connected: "+ socket.id)
    // console.log ("Now are connecting to server: "+io.engine.clientsCount)

    // socket.on("connectUser", username=>{    // vartotojo prisijungima gaudom
    //     console.log(username)
    //     const user={
    //         username: username,
    //         id: socket.id,
    //         points: 0
    //     }
        
    //     if (users.length===0){
    //         activeID= randomMaxMin(quiz.length-1,0)
            
    //     }
    //     question = quiz[activeID]

    //     users.push(user)
    //     // ** isfiltruojam is masyvo pasikartojancius objektus pgl. id arba username (arba kitaip galima) **//
    //     // ** pasikartojan2ius ir tuscius vardus isfiltrvom FrontEnd'e ** //
    //     const seen = new Set();
    //     const filteredArr = users.filter(el => {
    //         const duplicate = seen.has(el.id);
    //         seen.add(el.id);
    //         return !duplicate;
    //     });

    //     users=[...filteredArr] //sudedam i masyva pagal unikalius socket.id

    //     const someUser = users.find(x=>x.id===socket.id).username
    //     const add=true // userio prisijungimo indikatorius (trigeris)

    //     console.log(users, someUser, activeID, question)

    //     io.emit('responseUsers', users, add, someUser, question)     // visiems userius išsiunčia
        
    // })

    // socket.on("disconnect", ()=>{   // vartotojo atsijungima gaudom
    //     let someUser
    //     let add= false // userio atsijungimo indikatorius(trigeris)
    //     if(users.length>0 && users.find(x=>x.id===socket.id))  { // apdorojam, kad nebutu klaidos pradzioje ir isjungiant tuscio userio socketa
    //        someUser = users.find(x=>x.id===socket.id).username 
    //     }else{
    //         someUser = "" // tuscio userio atsijungimo apdorojimui reiksme
            
    //     }
        
    //     console.log (socket.id, users, someUser)

    //     users = users.filter(x =>x.id!==socket.id)
    //     io.emit('responseUsers', users, add, someUser)
    // })

    // socket.on("myAnswer", msg=>{
    //     console.log(msg, socket.id)
    //     chat.push(msg)
    //     console.log(chat)
    //     const id= socket.id
    //     let correct
    //     if(quiz[activeID].answer.toLowerCase()===msg.toLowerCase()){
    //         const correctUser = users.find(x=>x.id===socket.id).username
    //         const correctID =users.findIndex(x => x.id===socket.id)
    //         users[correctID].points+=1
    //         console.log("Atsakymas geras ", correctUser, correctID, users[correctID].points )
    //         correct=true
    //         activeID= randomMaxMin(quiz.length-1,0)
    //         question = quiz[activeID]

    //     }else{
    //         console.log("Atsakymas negeras")
    //         correct=false
    //     }
    //     //socket.broadcast.emit('response', msg)   // visiems isskyrus siunteja
    //     io.emit('response', msg, id, correct, users, question)        // visiems žinutę išsiunčia
    //     //io.emit('response', chat)     // visiems chat'ą išsiunčia

    // })

})

