const models=require('../models');
const bcrypt = require('bcrypt');

  exports.login =function(req){
    return models.users.findOne({
    where :{
        status: 1,
        emailid: req.body.emailid
  
      }
    }).then(result => {
      if(result){
        if(bcrypt.compareSync(req.body.password, result.password)) {
          return {status:true};
         } else {
          return {status:false};
         }
  
      } else {
        return {status:false};
      }
    });
  } ;