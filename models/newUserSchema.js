const mongoose =require("mongoose")
const Schema =mongoose.Schema


const newUserSchema = new Schema({
    username:{
        type: String,
        reguired: true
    },
    money:{
        type: Number,
        reguired: true
    },
    password:{
        type: String,
        reguired: true
    },
    
})

module.exports = mongoose.model("userModel2", newUserSchema)