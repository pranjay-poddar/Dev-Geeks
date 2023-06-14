require("./connection")
const mongoose=require("mongoose")
const dateschema=new mongoose.Schema({
date:{
    type:String,
    required:true,
    unique:false
},
topic:{
    type:String,
    required:true,
    unique:false
},
description:{
    type:String,
    required:true,
    unique:false
}
})
const Dateinfo=new mongoose.model("Date",dateschema,"Date")
module.exports=Dateinfo