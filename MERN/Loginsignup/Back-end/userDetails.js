const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
    {
        username: {type:String,unique:true},
        phoneno: String,
        password: String,
    },{
        collection: "userInfo"
    }
)

mongoose.model("userInfo", userDetailsSchema);