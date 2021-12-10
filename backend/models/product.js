const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 32,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 2000,
    },
    price: {
      type: Number,
      required: true,
      maxLength: 32,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
