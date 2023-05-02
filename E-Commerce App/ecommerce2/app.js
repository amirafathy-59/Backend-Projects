
process.on('uncaughtException',(err)=>{
    console.log("uncaughtException",err);
})

const express = require("express");
const { dbConnection } = require("./src/database/dbConnection");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 4000;
var morgan = require("morgan");
const AppError = require("./src/utils/AppError");
const globalMiddlewareErr = require("./src/utils/globalMiddlewareErr");
const { allRequires } = require("./src/utils");
//middleware
app.use(express.json());
app.use(express.static('uploads'))
if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
}
allRequires(app)
app.all("*", (req, res, next) => {
  next(
    new AppError(`can't find this route: ${req.originalUrl} on server`, 404)
  );
});

// global error handling middleware
app.use(globalMiddlewareErr);

dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


process.on('unhandledRejection',(err)=>{
    console.log("unhandledRejection",err);
})
