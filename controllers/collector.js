const models = require("../models");

exports.save = function(req) {
	if(!req.body.status) {
		req.body.status = 0;
	}
	if (req.body.id) {
		return models.collectors.update(req.body, {
			where: {
				id: req.body.id
			}
		});
	} else {
		return models.collectors.create(req.body);
	};
};
exports.list=function(req){
    return models.collectors.findAll({

    });
  };

  exports.delete = function(req) {
	return models.collectors.destroy({
		where: {
			id: req.body.id
		}
	});
};

exports.get = function(req) {
	return models.collectors.findOne({
		where: {
			id: req.body.id
		}
	});
};