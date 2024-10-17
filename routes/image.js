//routes/image.js
const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload');
const compareImages = require('../utils/compareImages');
const { verifyToken } = require('../middleware/auth');

// Image similarity check endpoint
router.post('/check-similarity',verifyToken, upload.single('uploadedImage'), async (req, res) => {
  try {
    const { referenceImageUrl } = req.body;

    // Upload the uploaded image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(new Error('Cloudinary upload error'));
        } else {
          resolve(result);
        }
      }).end(req.file.buffer); // Assuming multer stores the image buffer
    });

    const uploadedImageUrl = result.secure_url;

    // Compare the uploaded image with the reference image
    const similarityScore = await compareImages(referenceImageUrl, uploadedImageUrl);

    return res.status(200).json({
      message: 'Image similarity calculated successfully',
      uploadedImageUrl,
      similarityScore
    });

  } catch (err) {
    console.error('Error during image similarity check:', err);
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
