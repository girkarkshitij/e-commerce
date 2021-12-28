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
  req.profile.salt = undefined;
  req.profile.encryptedpassword = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, user) => {
      if (err) {
        return res.status(403).json({
          msg: 'You are not authorized to update this info',
        });
      }
      user.salt = undefined;
      user.encryptedpassword = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};
