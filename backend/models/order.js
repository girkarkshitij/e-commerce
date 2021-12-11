const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const productsInCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  name: String,
  quantity: Number,
  totalPrice: Number,
});

const orderSchema = new Schema(
  {
    products: [productsInCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
const ProductsInCart = mongoose.model('ProductsInCart', productsInCartSchema);

module.exports = { Order, ProductsInCart };
