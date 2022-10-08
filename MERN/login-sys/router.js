var express = require('express');
var router = express.Router();

const cred = {
    email : 'admin@gamil.com' , 
    password : 'admin'
}

// login user
router.post('/login' , (req , res)=>{
    if(req.body.email == cred.email && req.body.password == cred.password)
    {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard')
        // res.end('login successful...')
    }
    else{
        res.end('invalid username')
    }
})

// route for dashboradd
router.get('/dashboard' , (req , res)=>{
    if(req.session.user){
        res.render('dashboard')
    }else{
        res.send('unauth user')
    }
})

// route for logout
router.get('/logout' , (req , res)=>{
    req.session.destroy(function(err){
        if(err)console.log(err);
        else{
            res.render('base' , {
                title: 'express',
                logout : 'logout success'
            })
        }
    })
})

module.exports = router;