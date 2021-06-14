const { getAllTopics } = require('../models/model');

exports.allTopics = (req, res, next) => {
  getAllTopics().then((response) => {
    res.status(200).send({ topics: response });
  });
};
