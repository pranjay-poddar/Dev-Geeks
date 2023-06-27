const mongoose = require('mongoose');

let uri = "mongodb+srv://admin:admin@b.mongodb.net/UrlShortner?"; //replace it with your URI

mongoose.connect(uri,{
	useNewUrlParser: true, 
	useUnifiedTopology: true
});

let db = mongoose.connection;

db.on('error', (error)=>{console.log(error)});

db.once('open', ()=>{console.log("Successfully conected to database")})