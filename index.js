const express = require("express");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

var cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());

//Routers
const authRouter = require("./routes/auth");
const mohRouter = require("./routes/moh");
const bedRouter = require("./routes/bed");
const patientRouter = require("./routes/patient");
const reportRouter = require("./routes/report");
const testRouter  = require("./routes/tests");
const facilityRouter =   require("./routes/facility");
const userRouter =   require("./routes/user");
// const doctorRouter = require("./routes/doctor");
// const hospitalAdminRouter = require("./routes/hospitalAdmin");

app.get("/", (req, res) => {
  //res.redirect("/home");
  res.send('API is running...');
});

app.use("/auth", authRouter);
app.use("/moh", mohRouter);
app.use("/bed", bedRouter);
app.use("/patient", patientRouter);
app.use("/report", reportRouter);
app.use("/test", testRouter);
app.use("/facility", facilityRouter);
app.use("/user", userRouter);

app.get("/*", (req, res) => {
  res.status(404).json({
    sucess: 0,
    message: "Page Not Found",
  });
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));


module.exports = server;
