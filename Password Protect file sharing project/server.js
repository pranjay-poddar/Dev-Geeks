require('dotenv').config()
const express = require('express');
const mongoose=require('mongoose');
const multer=require('multer');
const bcrypt= require('bcrypt');
const PORT = process.env.PORT || 2000;

const app = express();
app.use(express.urlencoded({extended:true}));
const File = require('./models/File')

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('connection successfull');
}).catch((err)=>console.log('no connection'));


//all the files that is uploaded will be sent to the upload folder , this is a middleware 
const upload = multer({dest:"uploads"});

app.set('view engine', "ejs")

app.get('/',(req,res)=>{
   res.render("index");
})


//multer will keep in mind only the file related properties , and password is not file related ones ..so we have to access it using req.body.
app.post('/upload',upload.single("file"), async(req,res)=>{
    

    const fileData={
        path:req.file.path,
        originalName:req.file.originalname,
    
    }

    if(req.body.password!=null && req.body.password!=="")
    {
        fileData.password=await bcrypt.hash(req.body.password,10);
    }

    const file = await File.create(fileData);
    console.log(file);
    
   
    
    res.render("index",{fileLink:`${req.headers.origin}/file/${file.id}`})
    
})

app.route('/file/:id').get(handleDownload).post(handleDownload);

async function handleDownload(req,res)
{

    const file = await File.findById(req.params.id);

    if(file.password!=null)
    {
        if(req.body.password==null)
        {
            res.render('password');
            return
        }

        if(!(await bcrypt.compare( req.body.password,file.password)))
        {
            res.render("password",{error:true})
            return
        }
    }



    file.downloadCount++;
    await file.save();
    res.download(file.path,file.originalName);

}


app.listen(PORT ,()=>{
    console.log(`server is running at port ${PORT}` )
})