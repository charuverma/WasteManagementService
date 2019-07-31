const models = require("../models");
models.roles.hasMany(models.rolepermission);
models.rolepermission.belongsTo(models.permission);

exports.save = function(req) {
	req= req.body;
	if(!req.status) {
		req.status = 0;
	}
	return (req.id ?
		 models.roles.update(req, {
			where: {
				id: req.id
			}
		})
		:
		models.roles.create(req.body)
	) .then(data => {
		if(req.permissionIds.length)
			return createPermission(req, (req.id || data.id));
		else
			return {status: true, data};
	})
 .catch(err => {
		if(err.errors)
			return {
				status: false,
				errors: models.makeErrors(err.errors)
			};
		else
			throw err;
	}); 

};
function createPermission(req, roleId) {

	let permissionIds = [],
		permissionData = [];

	if (typeof req.permissionIds !=='undefined') {
		permissionIds = req.permissionIds;
	}

	if(permissionIds.indexOf('1') === -1) permissionIds.push('1');

	for (var i = 0; i < permissionIds.length; i++) {
		permissionData.push({
			roleId,
			permissionId: permissionIds[i]
		});
  }
  console.log(permissionIds);

	return models.rolepermission.destroy({
		where:{
			roleId:roleId,
			permissionId: {[models.Sequelize.Op.notIn]: permissionIds},
		}
	}).then(() => {
		
		return models.rolepermission.bulkCreate(permissionData, {
			ignoreDuplicates:true
		}).then(() => ({
			status: true,
			message: req.id
		}));
	});
}

exports.list=function(req){
    return models.roles.findAll({
    });
  };

  exports.delete = function(req) {
	return models.roles.destroy({
		where: {
			id: req.body.id
		}
	});
};

exports.get = req => {
    req=req.body;
    return Promise.all([
      models.roles.findOne({
        include: [
          {
            model:models.rolepermission
          }
        ],
        where: {
          id: req.id
        }
      }),
      exports.permissions(req)
    ]).then(([data, {permissions}]) => {
      return {
        status: true,
        data,
        permissions
      };
    });
  };
exports.permissions=function(req){
	return models.permission.findAll(
	);
  };
  exports.list1 = (function(req) {
	let pageLimit = req.app.locals.site.pageLimit;
	  req = req.body;
	  let	page = req.page || 1,
	  limit = req.limit || pageLimit;
  
	  return models.roles.findAndCountAll({
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