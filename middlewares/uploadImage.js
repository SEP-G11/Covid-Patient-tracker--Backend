const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('user_photo')

function uploadFileMiddleware(req, res, next) {

    console.log("Middle ware working on")
    upload(req, res, (err) => {
        if (err) {
            return res.json({success:0,message:err.message,from:"Middleware"})
        }
        console.log("Goto Next")
        next()
      });
}

module.exports = uploadFileMiddleware;