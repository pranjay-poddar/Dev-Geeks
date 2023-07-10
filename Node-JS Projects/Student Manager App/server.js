const express = require("express");
const connectDb = require("./db.js");
const errorHandler = require("./middleware/errorHandler.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDb();

app.use(express.json());
app.use("/api/students", require("./routes/studentRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
// github - vishnuprasad2004