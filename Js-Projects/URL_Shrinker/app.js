const express =require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const shortid=require("shortid");
const app=express();

app.set("view engine","ejs");
//app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://abhiyodaya2002:pandey150402@cluster0.yii2q.mongodb.net/urldb");

const urlschema=new mongoose.Schema({
    full:{
        type:String,
        required:true,
       
    },
    short:{
        type:String,
        required:true,
        default: shortid.generate
    },
    clicks:{
        type:Number,
        required:true,
        default:0

    }
})

const url=mongoose.model("url",urlschema);

app.get("/",async(req,res)=>{
   
    var urls=await url.find();
    
    
    res.render("index",{urls: urls});
});
app.post("/shortURL",async(req,res)=>{
    /*  If you to print only the recent url entry in app.get at hoem route then in post route you must delete all documents in the database then add the new url entry 
    url.deleteMany({}, function ( err ) {
        console .log( "success" );
    });
   */
   var url1= new url({
    full :req.body.fullUrl
   })
 url1.save();

   res.redirect("/");
})

app.get("/:newurl", async(req,res)=>{
   var newurlDoc=await url.findOne({short:req.params.newurl});

   if(newurlDoc!=null)
   {
     newurlDoc.clicks++;
     newurlDoc.save();
     res.redirect(newurlDoc.full);
   }
   else
   {
    res.send("Error 404! Requesting page not found ");
   }
})

app.listen(process.env.PORT||3000,()=>{
    console.log("server running at port 3000");
})