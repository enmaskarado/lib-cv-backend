require("dotenv").config();
const cors = require('cors');
const express = require("express");
const app = express();
const path = require("path")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
app.set("public", path.join(__dirname, "./public"));

connectDB();
/// My Routes
// const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const certificateRoutes = require("./routes/certificate");


/// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://elcvdelib-backend.fly.dev",
    credentials: true,
    optionsSuccessStatus: 200
  })
);


/// My Routes
// app.use("/api", authRoutes);
app.use("/project", projectRoutes);
app.use("/certificate", certificateRoutes);


const PORT = process.env.PORT || 8000;

mongoose.connection.once('open', () => {
  console.log('Connection to MongooseDB');
  app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
})
