const models = require("../models");

exports.save = function(req) {
	if(!req.body.status) {
		req.body.status = 0;
	}
	if (req.body.id) {
		return models.categorys.update(req.body, {
			where: {
				id: req.body.id
			}
		});
	} else {
		return models.categorys.create(req.body);
	}
};

//list
exports.list = function(req) {
	return models.categorys.findAll({
		attributes: [
			"id",
			"parentId",
			"name",
			"status",
			"file",
			[
				models.sequelize.literal(
					"(Select name from category where id=categorys.ParentId)"
				),
				"Parent"
			]
		],
	});
};

//delete
exports.delete = function(req) {
	return models.categorys.destroy({
		where: {
			id: req.body.id
		}
	});
};
//get
exports.get = function(req) {
	return models.categorys.findOne({
		where: {
			id: req.body.id
		}
	});
};
