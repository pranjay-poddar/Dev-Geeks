const express = require('express');
const app = express();
const PORT = 4444;
const path = require('path');
const bodyparser = require('body-parser')
const session = require('express-session');
const{v4:uuidv4} = require('uuid');
const router = require('./router')

app.use('/static', express.static(path.join(__dirname , 'static')));
app.set('view engine' , 'hbs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true})); 

app.use(session({
    secret: uuidv4(),
    resave:false , 
    saveUninitialized:true
}))

app.use('/route' , router);

// home route
app.get('/' , (req , res)=>{
    res.render('base' , {
        title : 'login system'
    })
})


app.listen(PORT , ()=>{
    console.log('http://localhost:'+PORT);
})