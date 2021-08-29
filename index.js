const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const config = require("config");
const cookieParser = require("cookie-parser");

var cors = require("cors");


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routers
const authRouter = require("./routes/auth");
const mohRouter = require("./routes/moh");
// const doctorRouter = require("./routes/doctor");
// const hospitalAdminRouter = require("./routes/hospitalAdmin");



app.use("/auth", authRouter);
app.use("/moh", mohRouter);
// app.use("/doctor", doctorRouter);
// app.use("/hospitalAdmin", hospitalAdminRouter);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/*", (req, res) => {
  res.status(404).json({
    sucess: 0,
    message: "Page Not Found",    
  });    
});

module.exports = server;
