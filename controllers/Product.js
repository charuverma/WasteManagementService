const models =require('../models');

exports.save = (function(req){
    if(req.body.id){
        return models.product.update(
            req.body,{
                where:{
                    id:req.body.id
                }
            }
        )
    }
    else{
        return models.product.create(req.body);
    }
});
//Show Product List
exports.list = (function(req){
    return models.product.findAll({
    });
});
//delete 
exports.delete= (function(req)
{
  return models.product.destroy({
    where:{
      id:req.body.id
    }
  });
});

//edit get
exports.get = (function(req){
    return models.product.findOne({
      where:{
        id:req.body.id
      }
  });
});