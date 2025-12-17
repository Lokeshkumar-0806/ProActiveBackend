const mongoose = require('mongoose');

const { Schema } = mongoose;

const timeSchema=new Schema({
    SessionName:{
        type:String,
        required:true,

    },
    duration:{
        type:Number,
        required:true,
    },
    StartTime:{
        type:Date,
        required:true,
    },
    EndTime:{
        type:Date,
        required:true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Time',timeSchema);




