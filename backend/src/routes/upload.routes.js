const express = require("express");
const router = express.Router();
const { PutObjectCommand } = require("@aws-sdk/client-s3");
// FIX: was `const { s3 } = require(...)` — s3Client exports the client directly
const s3 = require("../config/s3Client");

// POST /api/upload  — upload a raw text message to S3
router.post("/", async (req, res, next) => {
  try {
    const bucket = process.env.S3_BUCKET_NAME;
    const message = req.body.message || "Hello PingMe S3!";
    const key = `uploads/simple-${Date.now()}.txt`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: message,
      ContentType: "text/plain",
    });

    await s3.send(command);

    res.status(200).json({
      success: true,
      message: "Uploaded to S3 successfully",
      file: key,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
