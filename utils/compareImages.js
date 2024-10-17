const compareImages = require("resemblejs/compareImages");
const fs = require("fs");
const axios = require("axios");

async function fetchImage(url) {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data);
}

// Function to compare two images and calculate similarity using resemble.js
async function calculateSimilarity(url1, url2) {
    try {
        const image1 = await fetchImage(url1);
        const image2 = await fetchImage(url2);

        const options = {
            output: {
                errorColor: { red: 255, green: 0, blue: 255 },
                errorType: "movement",
                transparency: 0.3,
                largeImageThreshold: 1200,
                useCrossOrigin: false,
                outputDiff: false,
            },
            scaleToSameSize: true,
            ignore: "antialiasing",
        };

        // Compare the images using resemble.js
        const data = await compareImages(image1, image2, options);
        const similarity = 100 - data.misMatchPercentage;  // Similarity is 100 - mismatch percentage
        return similarity;
    } catch (error) {
        console.error("Error comparing images:", error);
        throw new Error("Error comparing images");
    }
}

module.exports = calculateSimilarity;
