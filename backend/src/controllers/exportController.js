const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3Client");
const User = require("../models/user");

// Build a formatted .txt profile string from a user document
const buildProfileText = (user) => {
  const lines = [
    `========================================`,
    `  PingMe — Profile Export`,
    `========================================`,
    `Name   : ${user.name}`,
    `Email  : ${user.email}`,
    `Bio    : ${user.bio || "N/A"}`,
    `QR ID  : ${user.qrId || "N/A"}`,
    ``,
  ];

  if (user.links && user.links.length > 0) {
    lines.push(`--- Links ---`);
    user.links.forEach((link) => {
      const visibility = link.isVisible ? "visible" : "hidden";
      lines.push(`[${link.type}] ${link.label || link.type} → ${link.url} (${visibility})`);
    });
    lines.push(``);
  }

  lines.push(`========================================`);
  lines.push(`Exported : ${new Date().toISOString()}`);
  lines.push(`========================================`);
  return lines.join("\n");
};

// Helper: upload one user to S3
const uploadToS3 = async (user) => {
  const bucket = process.env.S3_BUCKET_NAME;
  if (!bucket) throw new Error("S3_BUCKET_NAME is not set in environment variables");

  const key = `profiles/${user._id}_${Date.now()}.txt`;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buildProfileText(user),
    ContentType: "text/plain",
  });

  await s3.send(command);

  return {
    userId: user._id,
    fileName: key,
    fileUrl: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  };
};

// GET /api/export  — export ALL users to S3
const exportAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    const results = await Promise.allSettled(users.map(uploadToS3));

    const succeeded = results
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value);
    const failed = results.filter((r) => r.status === "rejected").length;

    res.status(200).json({
      success: true,
      message: `Export complete — ${succeeded.length} succeeded, ${failed} failed`,
      data: succeeded,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/export/:userId  — export a single user to S3
const exportOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const result = await uploadToS3(user);

    res.status(200).json({
      success: true,
      message: "Profile exported to S3 successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { exportAllUsers, exportOneUser };
