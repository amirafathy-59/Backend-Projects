require('dotenv').config()
const express = require('express');
const connectDB = require('./DB/connection');
const moduleRouter = require('./module/index.router');
const app = express();
const port = process.env.PORT
const path = require("path")

app.use(express.json())

app.use(moduleRouter.authRouter,
    moduleRouter.userRouter,
    moduleRouter.messageRouter)


app.use('/uploads' , express.static(path.join(__dirname , './uploads')))


connectDB()
app.listen(port, () => console.log(`server is running on port ${port}`))