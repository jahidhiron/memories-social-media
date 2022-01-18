import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

// initialize app
const app = express();

// third-party configuration
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

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
