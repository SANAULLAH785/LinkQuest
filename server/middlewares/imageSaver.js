const { v2 } = require("cloudinary");
const cloudinary = v2;
const multer = require("multer");
const crypto = require("crypto");

// Cloudinary configuration
cloudinary.config({
  cloud_name: "djjn4dxpu",
  api_key: "435913532677436",
  api_secret: "fz83D8iflwaBX6v3ugmU_Ce2wMw",
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
