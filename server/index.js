const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const postRoute = require("./routes/posts");
const userRoute = require("./routes/users");

// initialize app
const app = express();

// third-party middleware
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoute);
app.use("/users", userRoute);
app.use("/", (req, res) => {
  res.send("API is running");
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 8080;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((error) => console.log(`Error to connect DB: ${error.message}`));
