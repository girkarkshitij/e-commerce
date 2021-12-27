const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        msg: 'No such user found',
      });
    }

    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  return res.json(req.profile);
};
