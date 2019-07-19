var express = require("express");
var router = express.Router();
var sequelize =require("../controllers/login");

router.post("/login", function(req, res, next) {
    sequelize
        .login(req)
        .then(result => {
            res.send(result);
        })
        .catch(console.log);
});
module.exports = router;