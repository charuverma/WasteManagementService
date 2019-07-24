var express = require("express");
var router = express.Router();
var sequelize = require("../controllers/country");

router.post("/save", function(req, res, next) {
    sequelize
        .save(req)
        .then(result => {
            res.send({ status: true, result });
        })
        .catch(console.log);
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

module.exports =router;