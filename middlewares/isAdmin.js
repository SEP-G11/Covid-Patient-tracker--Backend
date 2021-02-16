

module.exports = {
    isAdmin: async (req, res, next) => {
        console.log(req.user)
      if(req.user.userType==="Admin"){
          
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