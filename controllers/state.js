const models = require("../models");

exports.save = function(req) {
  if (!req.body.status) {
    req.body.status = 0;
  }
  if (req.body.id) {
    return models.states.update(req.body, {
      where: {
        id: req.body.id
      }
    });
  } else {
    return models.states.create(req.body);
  }
};
exports.list = function(req) {
  return models.states.findAll({
    attributes: [
      "id",
      "countryId",
      "name",
      "status",
      [
        models.sequelize.literal(
          "(Select name from countries where id=states.countryId)"
        ),
        "Parent"
      ]
    ],
    logging: true
  });
};

exports.delete = function(req) {
  return models.states.destroy({
    where: {
      id: req.body.id
    }
  });
};

exports.get = function(req) {
  return models.states.findOne({
    where: {
      id: req.body.id
    }
  });
};

exports.getAll = function(req) {
  return models.states.findAll({
    where: {
      countryId: req.body.countryId,
      status: 1
    }
  });
};

exports.list1 = (function(req) {
	let pageLimit = req.app.locals.site.pageLimit;
	  req = req.body;
	  let	page = req.page || 1,
	  limit = req.limit || pageLimit;
  
	  return models.states.findAndCountAll({
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
  });