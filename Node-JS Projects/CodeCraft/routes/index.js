const { render } = require('ejs');
var express = require('express');
var router = express.Router();

var fs = require('node:fs');
/* GET home page. */
router.get('/', function(req, res) {
  var arr = [];
  fs.readdir("./uploads",{withFileTypes: true},function(err, files)
  {
      files.forEach(function(elm)
      {
        arr.push({name : elm.name,isFolder : elm.isDirectory()});
      })
       res.render('index',{files : arr});
  })

});

router.post('/about', function(req, res) {
  res.render('about');

});
router.get('/contact', function(req, res) {
  res.render('contact');
});
router.get('/output', function(req, res) {
  res.render('output',{name:req.query.username});
  // console.log(req.query);
});

router.get('/createFile',function(req,res)
{
  fs.writeFile(`./uploads/${req.query.fileName}`," ",function(err)
  {
    if(err) throw err;
    else
      res.redirect('/');
  })
});
router.get("/createFolder",function(req,res)
{
  fs.mkdir(`./uploads/${req.query.folderName}`,function(err)
  {
    if(err) throw err;
    else{
      res.redirect('/');
    }
  })
});

router.get("/deleteFile/:name", function(req, res) {
  fs.unlink(`./uploads/${req.params.name}`, function(err) {
    if (err) throw err;
    res.redirect("/");
  });
});

router.get("/deleteFolder/:name", function(req, res) {
  fs.rmdir(`./uploads/${req.params.name}`, { recursive: true }, function(err) {
    if (err) throw err;
    res.redirect("/");
  });
});
router.post('/saveFile/:name', function(req, res) {
  fs.writeFile(`./uploads/${req.params.name}`, req.body.fileData, function(err) {
    if (err) throw err;
    res.redirect(`/fileName/${req.params.name}`);
  })
})

router.get("/fileName/:name",function(req,res)
{
  var arr = [];
  fs.readdir("./uploads",{withFileTypes: true},function(err, files)
  {
      files.forEach(function(elm)
      {
        arr.push({name : elm.name,isFolder : elm.isDirectory()});
      })

      fs.readFile(`./uploads/${req.params.name}`,"utf8",function(err,data)
      {
        if(err) throw err;
        else
        {
          res.render("indexUtil",{files:arr,fileName:req.params.name,data});
        }
      })
    })
})

module.exports = router;
