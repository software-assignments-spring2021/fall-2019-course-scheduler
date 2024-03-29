var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema');
const {ValidationError, PermissionError, DatabaseError, HashError}
 = require('../errors/error');

router.get("/", (req,res,next)=>{
  console.log(req)

  if(req.session.user_id){
    req.session.destroy();
    res.status(200).send("successfully log out");
  }
  else{
    let err = new PermissionError("User is not logged in");
    res.status(err.status).send(err);
  }
})

module.exports = router;
