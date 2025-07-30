require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const adminProductsRouter = require("./routes/admin/products-routes");
const authRouter = require("./routes/auth/auth-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const downloadRoute = require("./routes/download");

const compression = require("compression");

const Product = require("./models/Product")

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.set("autoIndex", true);

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB connected")

    setInterval(() => {
      mongoose.connection.db.admin().ping()
        .then(() => console.log("Mongo ping OK"))
        .catch((e) => console.warn("Mongo ping error", e));
    }, 4 * 60 * 1000);

    try {
        await Product.syncIndexes();
        console.log("✅ Product indexes synced");
    } catch (err) {
      console.error("❌ Failed to sync Product indexes:", err);
    }

    app.listen(PORT, () => {
      console.log(`Server is now running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use(compression());
app.disable('etag');

// Define allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://prgems.onrender.com',
  'https://www.prgems.in'
];


app.use(
  cors({
    // origin: process.env.CLIENT_BASE_URL,
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS: ' + origin));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/search", shopSearchRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.use("/api", downloadRoute);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));