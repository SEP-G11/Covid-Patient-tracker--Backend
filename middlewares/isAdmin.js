

module.exports = {
    isAdmin: async (req, res, next) => {
      if(req.user.type==="Admin"){
          next()
      }
      else{
          res.json({
              success:0,
              message:"Not an Admin. Need Admin Privilages"
          })
      }
    },
  };