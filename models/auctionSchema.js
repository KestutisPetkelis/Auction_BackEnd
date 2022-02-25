const mongoose =require("mongoose")
const Schema =mongoose.Schema


const auctionSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true
    },
    startprice:{
        type: Number,
        require:true
    },
    sellprice:{
        type: Number,
        require:true
    },
    active:{
        type: Boolean,
        require: true
    },
    bids:{
        type:[
            {
            "username": String,
            "bid": Number,
            "time": Number
            }
        ]

    }
})

module.exports = mongoose.model("auctionModel", auctionSchema)