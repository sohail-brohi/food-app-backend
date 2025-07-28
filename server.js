const express = require("express");
const app = express();
require("dotenv").config();

const auth = require("./routes/user.routes");
const category = require("./routes/category.route");
const menu = require("./routes/menu.route");
const customization = require("./routes/customization.route");
const MenuCustomization = require("./routes/menu_customization.route");

//-------------DB CONNECTION----------
const { connectToDB } = require("./db");
//-------------MIDDLEWARE----------
app.use(express.urlencoded({ limit: "50mb" }));
app.use(
  express.json({
    limit: "50mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

//-------------ROUTES----------

app.use("/api/auth", auth);
app.use("/api/category", category);
app.use("/api/menu", menu);
app.use("/api/customization", customization);
app.use("/api/menu_customization", MenuCustomization);

//-------------ERROR HANDLING----------

// Global error handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ msg: err.message, details: err });
});

//global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    msg: err.message,
    details: err,
  });
});
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server started on PORT ${PORT}`);
  await connectToDB();
});
server.timeout = 30 * 60 * 1000; // 30 minutes

module.exports = { app, server };
