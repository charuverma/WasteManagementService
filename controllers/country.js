const models = require("../models");

exports.save = function(req) {
	if(!req.body.status) {
		req.body.status = 0;
	}
	if (req.body.id) {
		return models.countrys.update(req.body, {
			where: {
				id: req.body.id
			}
		});
	} else {
		return models.countrys.create(req.body);
	};
};
exports.list=function(req){
    return models.countrys.findAll({
    });
  };

  exports.delete = function(req) {
	return models.countrys.destroy({
		where: {
			id: req.body.id
		}
	});
};

exports.get = function(req) {
	return models.countrys.findOne({
		where: {
			id: req.body.id
		}
	});
};