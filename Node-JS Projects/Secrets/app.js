//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: "Our little Secret",
  resave: false,
  saveUninitialized: false,
}));
//Intializing the passport
app.use(passport.initialize());
app.use(passport.session());
const userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  },
  // facebookId: {
  //   type: String
  // },
  githubId: {
    type: String
  },
  secrets:[{
    type: String
  }]
});
//connnecting with mongodb database
async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/userDB'); // Works!
}
// const url = ("mongodb://localhost:27017/userDB");
// mongoose.connect(url);
run();
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
// userSchema.plugin(encrypt, { secret: process.env.SECRET,encryptedFields: ["password"] });
const User = new mongoose.model('User', userSchema);
passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//Serailizing and Deserializing user
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
//Driver code for Google oauth
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  scope: ["profile","email"]
}, function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({
    googleId: profile.id
  }, function(err, user) {
    return cb(err, user);
  });
}));
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/secrets"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({
//       facebookId: profile.id
//     }, function(err, user) {
//       return cb(err, user);
//     });
//   }
// ));
//Driver code for Github oauth
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/secrets"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
app.route('/')
  .get(function(req, res) {
    res.render("home");
  });
app.route('/auth/google')
  .get(passport.authenticate('google', {
    scope: ["profile"]
  }));
app.route('/auth/google/secrets')
  .get(passport.authenticate('google', {
    failureRedirect: '/login'
  }), (req, res) => {
    res.redirect('/secrets');
  });
// app.route('/auth/facebook')
//   .get(passport.authenticate('facebook', {
//     scope: ["profile"]
//   }));
// app.route('/auth/facebook/secrets')
//   .get(passport.authenticate('facebook', {
//     failureRedirect: '/login'
//   }), (req, res) => {
//     res.redirect('/secrets');
//   });
  app.route('/auth/github')
    .get(passport.authenticate('github', {
      scope: ["profile"]
    }));
  app.route('/auth/github/secrets')
    .get(passport.authenticate('github', {
      failureRedirect: '/login'
    }), (req, res) => {
      res.redirect('/secrets');
    });
app.route('/login')
  .get(function(req, res) {
    res.render("login");
  })
  .post(function(req, res) {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, function(err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/secrets");
        });
      }
    });
    // User.findOne({
    //   email: username
    // }).then((foundItem) => {
    //   if (foundItem.password===password){
    //     res.render("secrets");
    //   }
    // }).catch((err)=>{
    //   console.log(err);
    // })
    // bcrypt.compare(password,foundItem.password, function(err, result) {
    //   if (result === true) {
    //     res.render("secrets");
    //   }
    // });
    // }).catch((err)=>{
    //   console.log(err);
    // });
  });
app.route('/register')
  .get(function(req, res) {
    res.render("register");
  })
  .post(function(req, res) {
    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //   const newUser = new User({
    //     email: req.body.username,
    //     password: hash
    //   });
    //   newUser.save().then(() => {
    //     res.render("secrets");
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // });
    User.register({
      username: req.body.username
    }, req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/secrets");
        });
      }
    });
  });
app.route("/secrets")
  .get(function(req, res) {
    if (req.isAuthenticated()) {
        User.find({"secrets": {$ne: null}}).then(foundUsers=>{
          if (foundUsers){
            res.render("secrets",{usersWithSecrets: foundUsers});
          }
        }).catch(err=>{
          console.log(err);
        });
    } else {
      res.redirect("/login");
    }
  });
app.route("/submit")
.get(function(req,res){
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
})
.post(function(req,res){
  const submittedSecret = req.body.secret;
  User.findById(req.user.id).then(foundUser=>{
      if (foundUser){
        foundUser.secrets.push(submittedSecret);
        foundUser.save();
        res.redirect("/secrets");
      }
    }).catch(err=>{
      console.log(err);
    })
})
app.route("/logout")
  .get(function(req, res) {
    req.logout(function(err) {
      console.log(err);
    });
    res.redirect("/");
  });
const port = 3000 || process.env.PORT;
app.listen(port, function() {
  console.log("The app is running on the port " + port);
});
