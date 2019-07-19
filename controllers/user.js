const models = require("../models");

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
			console.log("defrtgyhujk");
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