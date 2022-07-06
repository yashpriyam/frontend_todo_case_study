const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const routers = require("./routes");

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/.netlify/functions/app", routers);

const MONGODB_URI =
  process.env.ENV_NAME === "staging"
    ? process.env.STAGING_DB
    : process.env.ENV_NAME === "production"
    ? process.env.PROD_DB
    : process.env.DEV_DB;

async function connectDB() {
  await mongoose.connect(`${MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
connectDB();


module.exports.handler = serverless(app);
