require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const lodash = require("lodash");
const mongoose = require("mongoose");
mongoose.set('strictQuery',false);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect(process.env.URL);
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  post:{
    type: String,
    required: true
  }
})
app.use(express.static("public"));
let POST = new mongoose.model("POST",postSchema)
const homeStartingContent = "Node.js is an open-source and cross-platform runtime environment built on Chrome’s V8 JavaScript engine for executing JavaScript code outside of a browser. You need to recollect that NodeJS isn’t a framework, and it’s not a programing language. It provides an event-driven, non-blocking (asynchronous) I/O and cross-platform runtime environment for building highly scalable server-side applications using JavaScript.Most people are confused and understand it’s a framework or a programing language. We often use Node.js for building back-end services like APIs, Web App, or Mobile App. It’s utilized in production by large companies like Paypal, Uber, Netflix, Walmart, etc.";
const aboutContent = "Hi, this is Vikas Sharma. I have created this website for the bloggers who like to post the blog content. It can be a starter blogging website for the young and futuristic bloggers.";
const contactContent = "You can contact me on my various social media handles.";
app.get("/", function(req, res) {
  POST.find({},function(err,posts){
    res.render("home", {
      StartingContent: homeStartingContent,
      posts: posts
    });
  });
});
app.get("/about", function(req, res) {
  res.render("about", {
    About: aboutContent
  });
});
app.get("/contact", function(req, res) {
  res.render("contact", {
    Contact: contactContent
  });
});
app.get("/compose", function(req, res) {
  res.render("compose");
});
app.get("/post", function(req, res) {});
app.post("/compose", function(req, res) {
  const ntitle = lodash.capitalize(req.body.title);
  const npost = lodash.capitalize(req.body.Post);
  const postITEM = new POST({
    title: ntitle,
    post: npost
  });
  postITEM.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});
app.get("/post/:topic", function(req, res) {
  POST.findOne({title:req.params.topic},function(err,post){
    if (!err){
      res.render("post",{
        title: post.title,
        post:post.post
      });
    }
  });
});
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("The Server is running on port "+port);
});
