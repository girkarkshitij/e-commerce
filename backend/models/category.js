const mongoose = require('mongoose');
const { Schema } = monoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      maxLength: 32,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);