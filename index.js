require("dotenv").config();
const express = require("express");
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

app.use("/",require("./routes"))

app.listen(process.env.APP_PORT,()=>{
    console.log("Server is running on",process.env.APP_PORT)
})