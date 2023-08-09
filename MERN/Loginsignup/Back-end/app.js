const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const mongourl = process.env.mongourl

mongoose.connect(mongourl,{useNewUrlParser:true}
    ).then(()=>{console.log("Connected to Database")}
    ).catch((e)=>{console.log("error",e)});


require("./userDetails")
const User = mongoose.model("userInfo")
app.post("/register",async (req,res)=>{
    const {username, phoneno, password} = req.body;

    const encryptedPassword = await bcrypt.hash(password,4)
    try {
        const olduser = await User.findOne({username})
        if(olduser){
           return res.json({error:"UserName exist"})
        }
        await User.create({
            username,
            phoneno,
            password:encryptedPassword,
        });
        res.send({status:"ok"});
    } catch (error) {
        res.send({status:"error"});
    }
})







app.listen(4000,()=>{
    console.log("Server Started")
})

// app.post("/post",async(req,res)=>{
//     // console.log(req.body);
//     const {data} = req.body;

//     try {
//         if(data1 == "crazy"){
//             res.send({status:"ok"});
//         }
//         else{
//             res.send({status:"user not found"});
//         }   
//     } catch (error) {
//         res.send({status:"Something went wrong try again"});
//     }
// });

// require("./userDetails")
// const User = mongoose.model("userInfo")

// app.post("/register",async(req,res)=>{
//     const {username,phoneno, password} = req.body;
//     try {
//         await User.create({
//             username,
//             phoneno,
//             password,
//         });
//         res.send({status:"ok"});
//     } catch (error) {
//         res.send({status:"error"});
//     }
// })