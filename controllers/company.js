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

exports.list1 = (function(req) {
	let pageLimit = req.app.locals.site.pageLimit;
	  req = req.body;
	  let	page = req.page || 1,
	  limit = req.limit || pageLimit;
  
	  return models.companys.findAndCountAll({
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