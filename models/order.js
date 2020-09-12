const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pizzaSize: String,
  pizzaCrust: String,
  toppings: [String],
  quantity: Number,
  price: Number,
  createdDate: {
    type: Date,
    default: Date.now,
  },
  status: String,
});

module.exports = mongoose.model("Order", OrderSchema);
