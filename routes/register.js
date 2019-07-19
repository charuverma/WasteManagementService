var express = require("express");
var router = express.Router();
var sequelize = require("../controllers/user");

router.post("/save", function(req, res, next) {
    sequelize
        .save(req)
        .then(result => {
            res.send({ status: true, result });
        })
        .catch(console.log);
});

module.exports =router;