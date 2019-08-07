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
					"(Select name from categories where id=categorys.ParentId)"
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

exports.list1 = function(req) {
	let pageLimit = req.app.locals.site.pageLimit;
	  req = req.body;
	  let	page = req.page || 1,
	  limit = req.limit || pageLimit;
  
	  return models.categorys.findAndCountAll({
		attributes: [
			"id",
			"parentId",
			"name",
			"status",
			"file",
			[
				models.sequelize.literal(
					"(Select name from categories where id=categorys.ParentId)"
				),
				"Parent"
			]
		],
		  limit: limit,
		  offset: (page - 1) * limit,
	  }).then(data => {
		  return {
			  status: true,
			  data: data.rows,
			  totalData: data.count,
			  pageCount: Math.ceil(data.count / limit),
			  pageLimit: limit,
			  currentPage: parseInt(page)
		  };
	  });
  };
  