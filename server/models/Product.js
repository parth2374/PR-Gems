// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema(
//   {
//     image: String,
//     title: String,
//     origin: String,
//     certificate: String,
//     price: Number,
//     weight: Number,
//     sku: Number,
//     shape: String,
//     video: String,
//     frontSide: String,
//     backSide: String
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", ProductSchema);

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
    video: String,
    frontSide: String,
    backSide: String,

    // new field: whether to show this product
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
