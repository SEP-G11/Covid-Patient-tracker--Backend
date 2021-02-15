require("dotenv").config();
const express = require("express");
const pool = require("./config/database");

var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

app.use("/",require("./routes"))

pool.getConnection(function(err, connection) {
    
    if(err){
        console.log("Connecting to Database Failed")
    }else{

        app.listen(process.env.APP_PORT, () => {
            console.log("Server is running on", process.env.APP_PORT)
        });
        console.log("Connected to Database")
    }
    
  });






