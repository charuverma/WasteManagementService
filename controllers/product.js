const models = require("../models");

exports.save = function(req) {
	if (req.body.id) {
		return models.product.update(req.body, {
			where: {
				id: req.body.id
			}
		});
	} else {
		return models.product.create(req.body);
	}
};
//Show Product List
exports.list = function(req) {
	return models.product.findAll({
		attributes: [
            'id',
            'name',
            'type',
			'file',
			'qty',
			'weight',
			'price',
            [
              models.sequelize.literal('(Select name from categories where id=product.type)'),
              'Parent'
            ]
          ],
          logging:true,
        });
};
//delete
exports.delete = function(req) {
	return models.product.destroy({
		where: {
			id: req.body.id
		}
	});
};

//edit get
exports.get = function(req) {
	return models.product.findOne({
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
  
	  return models.product.findAndCountAll({
		attributes: [
            'id',
            'name',
            'type',
			'file',
			'qty',
			'weight',
			'price',
            [
              models.sequelize.literal('(Select name from categories where id=product.type)'),
              'Parent'
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
  });
