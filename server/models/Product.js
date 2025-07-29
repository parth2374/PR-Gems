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

// 🔽 Indexes to optimize filtering and sorting
ProductSchema.index({ isListed: 1 });
ProductSchema.index({ origin: 1 });
ProductSchema.index({ certificate: 1 });
ProductSchema.index({ shape: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ weight: 1 });
ProductSchema.index({ sku: 1 });

// 🔽 Compound indexes for filter + sort together
ProductSchema.index({ isListed: 1, price: 1 });
ProductSchema.index({ isListed: 1, weight: 1 });

module.exports = mongoose.model("Product", ProductSchema);
