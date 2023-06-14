const express=require("express")
const mongoose = require("mongoose")
require("./database/connection")
const path=require("path")
const ejs=require("ejs")
const session=require("express-session")
const mongosession=require("connect-mongodb-session")(session)
const app=express()
const flash=require("connect-flash")
app.use(express.json())

app.use(express.static("./public"))
const Dateinfo=require("./database/dateschema")
app.use(session({
        secret:"Diary",
        resave:false,
        saveUninitialized:false
}))
const templatepath=path.join(__dirname,'./public')
app.use(flash())
app.set("view engine","ejs")
app.set("views",templatepath)
const port=8000
const hostname='127.0.0.1'
app.use(express.urlencoded({extended:false}))

app.get("/",async(req,res)=>
{
        res.render("index",{message:req.flash('msg')})
})

app.post("/",async(req,res)=>{
     
                const newdate= new Dateinfo({
                        date:req.body.entrydate,
                        topic:req.body.entrytitle,
                        description: req.body.dailyentry
                    })
                    await Dateinfo.insertMany([newdate])
                    req.flash('msg','Your Data Has Been Recorded')
                    res.redirect("/")
})
app.get("/yourdata",async(req,res)=>{
        const dat=req.session.diary
        
                if(dat===undefined)
                {req.flash('msg','Data Not Found')}
                res.render("yourdata",{message:req.flash('msg'),dat})}
                
)
app.post("/yourdata",async(req,res)=>{
     const data=await Dateinfo.find({date:req.body.entrydate})
     
        req.session.diary=data
        res.redirect("/yourdata")
})

app.listen(port,hostname,()=>{
        console.log("Server is Running!")
}
)








