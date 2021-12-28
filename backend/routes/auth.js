const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { signup, signin, signout, isSignedIn } = require('../controllers/auth');

router.post(
  '/signup',
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long'),
  signup
);

router.post(
  '/signin',
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').isLength({ min: 1 }).withMessage('Password is required'),
  signin
);

router.get('/testroute', isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
