const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },   // e.g. "github", "linkedin"
    label: { type: String, default: "" },     // display label
    url: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    orderIndex: { type: Number, default: 0 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    qrId: {
      type: String,
      unique: true,
      sparse: true,   // allows null/undefined without unique conflict
      trim: true,
    },
    links: {
      type: [linkSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
