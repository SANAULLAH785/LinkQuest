const { v2 } = require("cloudinary");
const cloudinary = v2;
const multer = require("multer");
const crypto = require("crypto");
require("dotenv").config();
const cloudname=process.env.cloud_name;
const apikey=process.env.api_key;
const apisecret=process.env.api_secret;

// Cloudinary configuration
cloudinary.config({
  cloud_name:cloudname,
  api_key:apikey,
  api_secret:apisecret
});

const imageUploader = multer().single("image");

module.exports = (req, res, next) => {
  imageUploader(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to upload the image." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image provided." });
    }

    const fileBuffer = req.file.buffer;
    const uniquePublicId = `${Date.now()}_${crypto
      .randomBytes(8)
      .toString("hex")}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: uniquePublicId },
      function (error, result) {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res
            .status(500)
            .json({ error: "Failed to upload the image to Cloudinary." });
        }

        const cloudinaryUrl = result.secure_url;
        req.imageUrl = cloudinaryUrl;

        next();
      }
    );

    // Create a readable stream from the buffer and pipe it to the upload stream
    const readableStream = require("stream").Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};
