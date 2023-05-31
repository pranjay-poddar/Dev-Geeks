const mongoose=require('mongoose');

const newsSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    url:{
        type:String,
        default:false
    }, 
    source:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

const News = mongoose.model('News',newsSchema);

module.exports = News;