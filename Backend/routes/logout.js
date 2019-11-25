var express = require('express');
var router = express.Router();
const User = require('../schema/user_schema');
const {ValidationError, PermissionError, DatabaseError, HashError}
 = require('../errors/error');

router.get("/", (req,res,next)=>{
  console.log(req.session.user_id);
  if(req.session.user_id){
    req.session.destroy();
    res.send("successfully log out");
  }
  else{
    let err = new PermissionError("User is not logged in");
    res.status(err.status).send(err);
  }
})

module.exports = router;