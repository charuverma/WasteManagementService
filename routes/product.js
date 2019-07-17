var express = require("express");
var router = express.Router();
var sequelize = require("../controllers/product");
var multer = require("multer");
const fs = require("fs");
const path = require("path");

//File Storage
let storage = multer.diskStorage({
	destination: function(req, file, cb) {
		let destFolder = "public/uploads/";
		if (!fs.existsSync(destFolder + file.fieldname)) {
			fs.mkdirSync(destFolder + file.fieldname);
		}
		cb(null, destFolder);
	},
	filename: function(req, file, cb) {
		cb(
			null,
			file.fieldname +
				"/" +
				Date.now() +
				path.extname(file.originalname).toLowerCase()
		);
	}
});
let uploadFile = multer({
	storage: storage,
	fileFilter: function(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
			cb("Only image files are allowed!", false);
		} else {
			cb(null, true);
		}
	},
	limits: { fileSize: 2000000 }
}).any();

/* save Product Details */
router.post("/save", function(req, res, next) {
	uploadFile(req, res, function(err) {
		console.log(err);
		if(req.files.length){
		req.body.file = req.files[0].path;
		}
		sequelize
			.save(req)
			.then(result => {
				res.send({ status: true, result });
			})
			.catch(console.log);
	});
});
router.post("/list", function(req, res, next) {
	sequelize
		.list(req)
		.then(result => {
			res.send({ status: true, result });
		})
		.catch(console.log);
});
router.post("/delete", function(req, res, next) {
	sequelize
		.delete(req)
		.then(result => {
			res.send({ status: true, result });
		})
		.catch(console.log);
});
router.post("/get", function(req, res, next) {
	sequelize
		.get(req)
		.then(result => {
			res.send({ status: true, result });
		})
		.catch(console.log);
});
module.exports = router;
