
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
//HEROKU
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;
const app = express();

app.use(logger("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Adding my db connection here//
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/budgetDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
db.on("Error on Mongo connection", error => console.error(error))
db.once("connected", () => console.log("Success! You are connected to Mongoose"))

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});