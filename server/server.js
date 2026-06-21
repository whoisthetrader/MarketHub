const express=require('express')
const dotenv=require('dotenv')
const mongoConnect = require('./config/db')
dotenv.config();
const app=express()
const portConnect=process.env.PORT
app.use(express.json())
mongoConnect();

app.listen(portConnect);