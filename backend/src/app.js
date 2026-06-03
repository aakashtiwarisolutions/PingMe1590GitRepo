const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const exportRoutes = require("./routes/exportRoutes");
const uploadRoutes = require("./routes/upload.routes");
const healthRoutes = require("./routes/health.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ── Middleware ───────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ── Routes ───────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ message: "PingMe API is running 🚀" }));
app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/upload", uploadRoutes);

// ── Global Error Handler ─────────────────────────────────────
app.use(errorHandler);

module.exports = app;
