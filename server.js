require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbconnect= require('./src/database/dbconnection');


const app = express();
app.use(express.json());
dbconnect();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

const authrouter=require('./src/route/auth');
// const fileRoute = require('./src/route/file');

app.use('/',authrouter)
// app.use('/file',fileRoute)

app.listen(process.env.PORT || 8888,()=>{
	console.log(`server started at ${process.env.PORT} `);
});
