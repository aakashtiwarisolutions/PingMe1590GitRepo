const express = require("express");
const router = express.Router();
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3Client");
const User = require("../models/user");

// GET /api/export
router.get("/", async (req, res) => {
  try {
    // 1️⃣ Fetch users from MongoDB
    const users = await User.find();

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    // 2️⃣ Convert users to plain text format
    const textData = users
      .map(user => `Name: ${user.name}, Email: ${user.email}`)
      .join("\n");

    // 3️⃣ Prepare S3 upload
    const fileName = `users-${Date.now()}.txt`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: textData,
      ContentType: "text/plain"
    });

    // 4️⃣ Upload to S3
    await s3.send(command);

    // 5️⃣ Return success
    res.json({
      message: "File uploaded successfully",
      fileName: fileName
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;