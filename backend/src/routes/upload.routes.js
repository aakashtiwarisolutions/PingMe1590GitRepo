const router = require("express").Router();
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("../config/s3Client");

// API
// POST http://localhost:4000/api/upload

router.post("/", async (req, res) => {
  try {
    const bucket = process.env.S3_BUCKET_NAME;

    const message = req.body.message || "Hello PingMe S3!";
    const key = `uploads/simple-${Date.now()}.txt`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: message,
      ContentType: "text/plain"
    });

    await s3.send(command);

    res.json({
      success: true,
      message: "Uploaded to S3 successfully",
      file: key
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
