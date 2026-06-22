const express=require('express')
const dotenv=require('dotenv')
const mongoConnect = require('./config/db')
const path=require('path')

const pathForEnv=path.join(__dirname,"../.env")
dotenv.config({
  path:pathForEnv
});
const app=express()
const authRouter=require('./routes/auth.routes')
const portConnect=process.env.PORT
app.use(express.json())
mongoConnect();

app.use('/api/auth',authRouter)

app.listen(portConnect);