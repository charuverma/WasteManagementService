const models = require("../models");
models.users.belongsTo(models.roles); 

exports.save = function(req) {
    if(!req.body.status) {
		req.body.status = 0;
	}
	return (
		req.body.id ?
		models.users.update(req.body, {
			where: {
				id: req.body.id
			}
		})
		:
		models.users.create(req.body)
	)
		.then(data => {
		return {status: true , id :(req.body.id || data.id)};
	}).catch(err => {
		if(err.errors)
		return{
			status:false,
			errors: models.makeErrors(err.errors)
		};
	else
		throw err;
	});  
	
};
//Show user List
exports.list = function(req) {
	return models.users.findAll({
		attributes: [
            'id',
            'role',
            'name',
			'emailid',
			'mobile',
			'password',
			'address',
			'status',
			'file',
            [
              models.sequelize.literal('(Select name from roles where id=users.role)'),
              'Parent'
            ]
          ],
          logging:true,
        });
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

exports.list1 = function(req) {
	let pageLimit = req.app.locals.site.pageLimit;
	  req = req.body;
	  let	page = req.page || 1,
	  limit = req.limit || pageLimit,
	  where = {},
	  whereRole={};
	  if(req.name) {
		where.name = {[models.Sequelize.Op.like] : '%' + req.name + '%'};
	  }
	  
	  if(req.roleName) {
		whereRole.name = {[models.Sequelize.Op.like] : '%' + req.roleName + '%'};
	  }
	  
	  return models.users.findAndCountAll({
		attributes: [
            'id',
            'roleId',
            'name',
			'emailid',
			'mobile',
			'password',
			'address',
			'status',
			'file',
		  ],
		    include:[{
			model: models.roles,
			attributes:[
				'name'
			],
			where: whereRole
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
  };