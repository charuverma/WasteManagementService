const models = require("../models");
models.citys.belongsTo(models.states);
models.citys.belongsTo(models.countrys);

exports.save = function(req) {
	if(!req.body.status) {
		req.body.status = 0;
	}
	if (req.body.id) {
		return models.citys.update(req.body, {
			where: {
				id: req.body.id
			}
		});
	} else {
		return models.citys.create(req.body);
	};
};
exports.list=function(req){
    return models.citys.findAll({
        attributes: [
			'id',
            'name',
            'status',
            [
              models.sequelize.literal('(Select name from states where id=citys.stateId)'),
              'Parent'
            ]
          ],
          logging:true,
        });
  };

  exports.delete = function(req) {
	return models.citys.destroy({
		where: {
			id: req.body.id
		}
	});
};

exports.get = function(req) {
	return models.citys.findOne({
		where: {
			id: req.body.id
		}
	});
};
exports.getAll = function(req) {
	return models.citys.findAll({
	  where: {
		stateId: req.body.stateId,
		status: 1
	  }
	});
  };

  exports.list1 = (function(req) {
	let pageLimit = req.app.locals.site.pageLimit;
	  req = req.body;
	  let	page = req.page || 1,
	  limit = req.limit || pageLimit,
	  where = {},
	  whereState = {},
	  whereCountry= {};
	  if(req.name){
		  where.name = {[models.Sequelize.Op.like] : '%' + req.name + '%'};
	  }

	  if(req.stateName) {
		whereState.name = {[models.Sequelize.Op.like] : '%' + req.stateName + '%'};
	  }

	  if(req.countryName) {
		whereCountry.name = {[models.Sequelize.Op.like] : '%' + req.countryName + '%'};
	  }


  
	  return models.citys.findAndCountAll({
		attributes: [
			'id',
			'name',
			'stateId',
			'countryId',
            'status',
		  ],
		  include:[{
			  model: models.states,
			  attributes:[
				  'name'
			  ],
			  where: whereState
		  }, {
			model: models.countrys,
			attributes:[
				'name'
			],
			where: whereCountry
		}],
		  where,
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