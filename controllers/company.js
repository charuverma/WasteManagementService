const models = require("../models");

exports.save = function(req) {
	if(!req.body.status) {
		req.body.status = 0;
	}
	if (req.body.id) {
		return models.companys.update(req.body, {
			where: {
				id: req.body.id
			}
		});
	} else {
		return models.companys.create(req.body);
	};
};
exports.list=function(req){
    return models.companys.findAll({

    });
  };

  exports.delete = function(req) {
	return models.companys.destroy({
		where: {
			id: req.body.id
		}
	});
};

exports.get = function(req) {
	return models.companys.findOne({
		where: {
			id: req.body.id
		}
	});
};