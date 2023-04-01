const cors = require("cors");
const express = require('express');
const app = express();
app.use(express.json());
const routes = require("./src/routes");
const mongoose = require("mongoose");
const multer= require("multer");
const http = require('http').Server(app);
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const server = require('http').Server(app);
const nodemailer = require('nodemailer');
const bcrypt= require('bcrypt'); 


const session = require('express-session');
const log = require('./src/routes/login');
const pin=require('./src/routes/pins')
const otp=require ('./src/routes/otp')
app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.use('/pins' , pin);
app.use('/otp' , otp);

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:5000"
};
app.use('/log', log);


const connectDB = async () => {
  try {
      await mongoose.connect('mongodb+srv://anas:anas123@cluster0.1moqjmp.mongodb.net/?retryWrites=true&w=majority')
  }
  catch (error) {
      console.log("Databse Error : ", error)
  }
}

const db =   mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
  console.log("Connected successfully");

});


app.use(cors(corsOptions));

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
