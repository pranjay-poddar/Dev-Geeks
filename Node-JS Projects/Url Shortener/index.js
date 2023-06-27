const express = require('express');
const path = require('path');
const bodyParser = require("body-parser")
const urlLink = require('./models/schemaUrl')

const app = express();

const db = require('./config/mongoDB');

app.set("view engine", "ejs");

app.set("views", path.join(__dirname,"views"))

app.use(bodyParser.urlencoded())

app.use(express.static(__dirname + '/assets'));

app.get('/', async (req,res)=>{

	let shorturls =  await urlLink.find()

	res.render("home",{
		shorturls: shorturls
	});
})

app.post('/shorturl',async (req,res)=>{

	let regex = /(http|https)/;

		if (regex.test(req.body.fullUrl)==false) {
			let newLink = await urlLink.create({
				fullUrl: `https://${req.body.fullUrl}`
			});
		}else{
			let newLink = await urlLink.create({
				fullUrl: req.body.fullUrl
			});
		}

	res.redirect('/');
	res.end();
                 
})

app.get('/:shorturl', async (req,res)=>{
	const trueUrl = await urlLink.findOne({
		shortUrl:req.params.shorturl
	});
	if (trueUrl== null) { 
		res.sendStatus(404);
	} else{
		trueUrl.clicks++;
		trueUrl.save();
		
		res.redirect(trueUrl.fullUrl);
	};
	
})

app.listen(process.env.PORT || 300);