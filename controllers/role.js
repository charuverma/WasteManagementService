const models = require("../models");

exports.save = function(req) {
	if(!req.body.Status) {
		req.body.Status = 0;
	}
	if (req.body.id) {
		return models.roles.update(req.body, {
			where: {
				id: req.body.id
			}
		});
	} else {
		return models.roles.create(req.body);
	};
};
exports.list=function(req){
    return models.roles.findAll({
    });
  };

  exports.delete = function(req) {
	return models.roles.destroy({
		where: {
			id: req.body.id
		}
	});
};

exports.get = function(req) {
	return models.roles.findOne({
		where: {
			id: req.body.id
		}
	});
};