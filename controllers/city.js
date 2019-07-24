const models = require("../models");

exports.save = function(req) {
	if(!req.body.status) {
		req.body.sstatus = 0;
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
			'countryId',
            'stateId',
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