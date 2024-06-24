const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("../routes/auth");
const companyRoutes = require("../routes/company");
const customerRoutes = require("../routes/customer");
const itemRoutes = require("../routes/item");
const invoiceRoutes = require("../routes/invoice");
require("dotenv").config();
const fs = require('fs');
const path = '/home/ubuntu/global-bundle.pem';
const app = express();

app.use(
  cors({
    origin: "https://main.d35u9840ycqal0.amplifyapp.com",
    allowedHeaders: ["Accept", "Content-Type", "Authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

// app.use(cors());

// Middleware
app.use(bodyParser.json());
console.log("Mongo URI inside express a",process.env.MONGO_URI);
fs.access(path, fs.constants.R_OK, (err) => {
  if (err) {
      console.error(`File not accessible: ${path}`, err);
  } else {
      console.log('File is accessible');
  }
});
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/auth", authRoutes);
app.use("/company", companyRoutes);
app.use("/customer", customerRoutes);
app.use("/item", itemRoutes);
app.use("/invoice", invoiceRoutes);

app.get("/", (req, res) => {
  res.send("Working fine");
});

// Start server
const PORT = process.env.PORT || 8087;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));