require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectToDatabase } = require("../utils/db.js");
const serverless = require('serverless-http');

const usersRoutes = require('../router/usersRoutes');
const ProductRoutes = require('../router/productRoutes');
const cityRoutes = require('../router/cityRoutes');
const customerRoutes = require('../router/customerRoutes');
const dealRoutes = require('../router/dealRoutes');
const merchantRoutes = require('../router/merchantRoutes');
const orderStatusRoutes = require('../router/orderStatusRoutes');
const productCategoryRoutes = require('../router/productCategoryRoutes');
const timeRoutes = require('../router/timeRoutes');
const warehouseRoutes = require('../router/warehouseRoutes');
const userAdminRoutes = require('../router/userAdminRoutes');
const cloudinaryRoutes = require('../router/cloudinary');
const stripeRoutes = require('../router/stripeRoutes');
const orderRoute = require('../router/orderRoute');
const saleRoute = require('../router/saleRoute');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/merchants', merchantRoutes);
app.use('/api/orderStatuses', orderStatusRoutes);
app.use('/api/productCategories', productCategoryRoutes);
app.use('/api/timeRoutes', timeRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/userAdmins', userAdminRoutes);
app.use('/api/cloudinary', cloudinaryRoutes);
app.use('/api/stripeSession', stripeRoutes);
app.use('/api/order', orderRoute);
app.use('/api/sale', saleRoute);

// Ensure DB is connected before handling any requests
let isDbConnected = false;
app.use(async (req, res, next) => {
  if (!isDbConnected) {
    try {
      await connectToDatabase();
      isDbConnected = true;
    } catch (error) {
      console.error("DB Connection Error:", error);
      return res.status(500).send("Database connection failed.");
    }
  }
  next();
});

// ✅ Export the wrapped app
module.exports = serverless(app);
