const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/upload", uploadRoutes);

// default route (optional)
app.get("/", (req, res) => {
  res.send("PingMe API is running ✅");
});

module.exports = app;
