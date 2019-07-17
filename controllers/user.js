const models = require("../models");

exports.save = function(req) {
    if(!req.body.status) {
		req.body.status = 0;
	}
	if (req.body.id) {
		return models.users.update(req.body, {
			where: {
				id: req.body.id
			}
		});
	} else {
	return models.users.create(req.body);
}
};
//Show user List
exports.list = function(req) {
	return models.users.findAll({});
};
//delete
exports.delete = function(req) {
	return models.users.destroy({
		where: {
			id: req.body.id
		}
	});
};
exports.get = function(req) {
	return models.users.findOne({
		where: {
			id: req.body.id
		}
	});
};