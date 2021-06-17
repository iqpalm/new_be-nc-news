const { selectEndpoints } = require("../models/api.model");

exports.getEndpoints = (req, res, next) => {
  selectEndpoints()
    .then((endPoints) => {
      res.status(200).send({ endPoints });
    })
    .catch((err) => {
      next(err);
    });
};
