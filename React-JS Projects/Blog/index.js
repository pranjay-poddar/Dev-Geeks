const express=require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const path=require('path');



const app=express();

app.use(cors());
app.use(express.json({limit:"30mb",extended: true}));
app.use(express.urlencoded({limit:"30mb",extended: true}));


app.use('/api/posts',require('./routes/posts'));


//const CONNECTION_URL='mongodb+srv://paras123:paras123@blog.w2rbt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(PORT,()=>{console.log("Working")})}).catch((error)=>{
     console.log(error.message);
    })

    if (process.env.NODE_ENV === 'production') {
        // Set static folder
        app.use(express.static('client/build'));
    
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }    
