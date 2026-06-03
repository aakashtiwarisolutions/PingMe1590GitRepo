const express = require("express");
const router = express.Router();
const { exportAllUsers, exportOneUser } = require("../controllers/exportController");

// GET /api/export           — export ALL users
router.get("/", exportAllUsers);

// GET /api/export/:userId   — export ONE user
router.get("/:userId", exportOneUser);

module.exports = router;
