const models = require("../models");

exports.save = function(req) {
  if (!req.body.status) {
    req.body.status = 0;
  }
  if (req.body.id) {
    return models.states.update(req.body, {
      where: {
        id: req.body.id
      }
    });
  } else {
    return models.states.create(req.body);
  }
};
exports.list = function(req) {
  return models.states.findAll({
    attributes: [
      "id",
      "countryId",
      "name",
      "status",
      [
        models.sequelize.literal(
          "(Select name from countries where id=states.countryId)"
        ),
        "Parent"
      ]
    ],
    logging: true
  });
};

exports.delete = function(req) {
  return models.states.destroy({
    where: {
      id: req.body.id
    }
  });
};

exports.get = function(req) {
  return models.states.findOne({
    where: {
      id: req.body.id
    }
  });
};

exports.getAll = function(req) {
  return models.states.findAll({
    where: {
      countryId: req.body.countryId,
      status: 1
    }
  });
};
