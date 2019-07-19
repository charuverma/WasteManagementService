"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var db = {};
var sequelize = new Sequelize("wasteManagement", "root", "miami@123", {
	host: "183.87.222.6",
	port: 3306,
	dialect: "mysql"
});

fs.readdirSync(__dirname)
	.filter(function(file) {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
		);
	})
	.forEach(function(file) {
		var model = sequelize["import"](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;


module.exports.makeErrors = function makeErrors(errors) {
	return errors.map(item => ({
		path: item.path,
		message: item.message
	}));
};
