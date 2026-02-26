const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");
const userRoutes = require("./routes/userRoutes");
const exportRoutes = require("./routes/exportRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// routes
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/export", exportRoutes);
// default route (optional)
app.get("/", (req, res) => {
  res.send("PingMe API is running ✅");
});
app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;
