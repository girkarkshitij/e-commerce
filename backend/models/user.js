const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true,
  },
  lastname: {
    type: String,
    maxLength: 32,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  userinfo: {
    type: String,
    trim: true,
  },
  encryptedpassword: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
});

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encryptedpassword = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.method = {
  securePassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encryptedpassword;
  },
};

module.exports = mongoose.model('User', userSchema);
