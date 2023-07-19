// initialize express
const express = require("express");
const app = express();

// initialize body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// initialize ejs
const ejs = require("ejs");
const { post } = require("jquery");
app.set("view engine", "ejs");

// initialize lodash
let _ = require("lodash");
// to use .kebabCase() method

//load media and css
app.use(express.static("public"));

//static content to load on start
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts = [
	{
		title: "Example Post",
		post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
];

//home route
app.get("/", (req, res) => {
	res.render("home", {
		content: homeStartingContent,
		postContent: posts,
		convertToKebabCase: _.kebabCase
	});
});

//about route
app.get("/about", (req, res) => {
	res.render("about", {
		content: aboutContent
	});
});

//contact us route
app.get("/contact", (req, res) => {
	res.render("contact", {
		content: contactContent
	});
});

//compose route
app.get("/compose", (req, res) => {
	res.render("compose", {});
});

//readmore route for each post
app.get("/posts/:postTitle", (req, res) => {
	let postname = req.params.postTitle;
	let mypost = posts.find( obj => _.kebabCase(obj.title) === postname);
	res.render("post", {
		postContent: mypost
	})
})

//post from compose
app.post("/compose", (req, res) => {
	let anotherTitleExist = false;
	posts.forEach( (obj) => {
		if( _.kebabCase(obj.title) === _.kebabCase(req.body.postTitle)){
			anotherTitleExist = true;
		}
	});

	if( !anotherTitleExist){
		posts.push({
			title: req.body.postTitle,
			post: req.body.postContent
		});
	}else{
		res.send("Post with the same name exists!!!");
	}
	
	res.redirect("/");
});

//start server on port 3000
app.listen(3000, () => {
	console.log("Server started on port 3000");
});
