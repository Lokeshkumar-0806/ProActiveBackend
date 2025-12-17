const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }   ,
    status:{
        type:String,
        enum:['todo','in-progress','completed'],
        default:'todo'
    },
    dueDate:{
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
module.exports=mongoose.model('Task',taskSchema);