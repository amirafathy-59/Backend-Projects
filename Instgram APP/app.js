 const express  = require('express');
//import  express  from 'express';
 const connectDB = require('./DB/connection');
// import connectDB from './DB/connection'
require("dotenv").config();
const path= require("path")
const  indexRouter  = require('./modules/index.router');
const app = express()
const port = process.env.port
app.use(express.json())
app.use("/api/v1/uploads",express.static(path.join(__dirname,'./uploads')))
app.use("/api/v1/auth",indexRouter.authRouter ) // here we used base url to improve performance 
app.use("/api/v1/user",indexRouter.userRouter )
app.use("/api/v1/admin",indexRouter.adminRouter )
app.use("/api/v1/post",indexRouter.postRouter )
const QRCode = require('qrcode');
app.get("/",(req,res)=>{
    QRCode.toDataURL('I am a pony!', function (err, url) {
        if (err) {
            
        res.status(400).json({messsage:"QR error",err})
        } else {
        console.log(url);
        res.json({messsage:"QR",url})
        }
      })
})
connectDB();

app.listen(port , ()=>{
    console.log(`Runinng..... on port ${port}`);
})