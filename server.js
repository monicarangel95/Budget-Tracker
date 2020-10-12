if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const PORT = 3000;
const app = express();
app.use(logger("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Adding my db connection here//
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// routes
app.use(require("./routes/api.js"));
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});