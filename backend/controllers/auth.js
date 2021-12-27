require('dotenv').config();
var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');
const { body, validationResult } = require('express-validator');

const User = require('../models/user');

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array()[0].msg });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ msg: 'Not able to save user' });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ msg: 'Entered email does not exist' });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({ msg: 'Email and password do not match' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token in cookie
    res.cookie('token', token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;

    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    msg: 'User signout successfully',
  });
};

// protected routes
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  userProperty: 'auth',
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!checker) {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res
      .status(403)
      .json({ msg: 'Only ADMIN is allowed, access denied' });
  }
  next();
};
