// external imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// internal import
const postRoute = require("./routes/posts");

// initialize app
const app = express();

// third-party configuration
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// routes
app.use("/posts", postRoute);

const CONNECTION_URL =
  "mongodb+srv://jahidhiron:hiRon1782@cluster0.v3i0y.mongodb.net/memories?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8080;

// DB connection
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((error) => console.log(`Error to connect DB: ${error.message}`));
