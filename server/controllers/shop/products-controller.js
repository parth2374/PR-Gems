const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page, 10)  || 1);
    const limit = Math.max(1, parseInt(req.query.limit,10) || 16);
    const skip  = (page - 1) * limit;
    // const { origin = [], certificate = [], shape = [], minPrice, maxPrice, minWeight, maxWeight, minSku, maxSku, sortBy = "price-lowtohigh" } = req.query;
    const { origin = "", certificate = "", shape = "", minPrice, maxPrice, minWeight, maxWeight, minSku, maxSku, sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (origin.length) {
      filters.origin = { $in: origin.split(",") };
    }

    if (certificate.length) {
      filters.certificate = { $in: certificate.split(",") };
    }

    if (shape.length) {
      filters.shape = { $in: shape.split(",") };
    }

    // numeric ranges
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }
    if (minWeight || maxWeight) {
      filters.weight = {};
      if (minWeight) filters.weight.$gte = Number(minWeight);
      if (maxWeight) filters.weight.$lte = Number(maxWeight);
    }
    if (minSku || maxSku) {
      filters.sku = {};
      if (minSku) filters.sku.$gte = Number(minSku);
      if (maxSku) filters.sku.$lte = Number(maxSku);
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "weight-lowtohigh":
        sort.weight = 1;

        break;

      case "weight-hightolow":
        sort.weight = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    // const products = await Product.find(filters).sort(sort);
    // const products = await Product.find({ ...filters, isListed: true }).sort(sort);

     // ← Run paginated query + count total
   const [ products, total ] = await Promise.all([
     Product.find({ ...filters, isListed: true })
       .sort(sort)
       .skip(skip)
       .limit(limit)
       .lean(),
     Product.countDocuments({ ...filters, isListed: true })
   ]);

    // res.status(200).json({
    //   success: true,
    //   data: products,
    // });
    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
