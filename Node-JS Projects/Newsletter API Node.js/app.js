const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.emai;

//data object that we need to post to mailchimp server
    const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };
 
//coverting data object from parse form to collapsed string form
    const jsondata= JSON.stringify(data);

    const url="https://us9.api.mailchimp.com/3.0/lists/d28f6c67cc";

    const options={
        method: "POST",
        auth:"vedant:f91ec3f973eae8221b0b83c8ca8959d4-us9"
    }

    const request= https.request(url, options, function(response){

        if(response.statusCode==200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    
    request.write(jsondata);
    request.end();
});

app.post("/failure", function(req,res){
   res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("server is up & running");
})
