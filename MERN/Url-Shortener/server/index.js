const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Port = process.env.PORT || 5000;
const urlRoute = require("./routes/urlRoute");

app.use(express.json());

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.baseUrl = `${req.protocol}://${req.get("host")}`;
  next();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("helllooooo");
});

app.listen(Port, () => {
  console.log(`server started at port ${Port}`);
});

// routes
app.use("/url", urlRoute);
