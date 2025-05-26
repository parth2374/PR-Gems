const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    origin: String,
    certificate: String,
    price: Number,
    weight: Number,
    sku: Number,
    shape: String,
    video: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);