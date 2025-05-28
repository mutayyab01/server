require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectToDatabase } = require("../utils/db.js");

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

app.use(cors({
    origin: ['*', '*'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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

// Connect DB before handling requests
let isDbConnected = false;
app.use(async (req, res, next) => {
  if (!isDbConnected) {
    try {
      await connectToDatabase();
      isDbConnected = true;
      next();
    } catch (error) {
      console.error("DB Connection Error:", error);
      res.status(500).send("Database connection failed.");
    }
  } else {
    next();
  }
});

// Export as Vercel serverless function
module.exports = app;
