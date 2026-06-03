const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// GET /api/health  — check server + DB status
router.get("/", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = ["disconnected", "connected", "connecting", "disconnecting"][dbState] || "unknown";

  res.status(200).json({
    success: true,
    server: "online",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
