/**
 * @file ImageProcessor.js
 * @description
 * This class provides a suite of image processing functionalities for p5.js images.
 * It includes methods to convert images to grayscale, adjust brightness, extract
 * color channels,and apply thresholding.
 *
 * Methods:
 * - toGrayscale(): Converts the image to grayscale.
 * - increaseBrightness(amount): Adjusts the brightness of the image.
 * - extractChannel(channel): Extracts a specific color channel (red, green, or blue).
 * - applyThreshold(thresholdValue, channel): Applies a threshold to a color channel.
 *
 * Internal Helper Methods:
 * - _createCopy(): Creates a copy of the current image.
 */
class ImageProcessor {
  constructor(image = null) {
    this.image = image;
  }

  setImage(image) {
    this.image = image;
  }

  isImageSet() {
    return this.image !== null;
  }

  /**
   * Converts the current image to grayscale.
   *
   * This method creates a new image with the same dimensions as the current image,
   * copies the current image into the new image, and then processes each pixel to
   * convert it to grayscale. The grayscale conversion uses the standard luminance
   * formula with coefficients for red, green, and blue channels.
   *
   * @param {number} [brightnessFactor=1.2] - The factor to enhance the brightness
   * of the grayscale value.
   * @returns {Image} - The grayscale image.
   */
  toGrayscale(brightnessFactor = 1.2) {
    if (!this.isImageSet()) return;
    // Create a new image with the same dimensions as the current image
    let grayscaleImage = this._createCopy();

    // Load the pixel data from the new image for manipulation
    grayscaleImage.loadPixels();

    // Coefficients for the luminance formula
    const rCoeff = 0.299;
    const gCoeff = 0.587;
    const bCoeff = 0.114;

    // Iterate through each pixel and convert it to grayscale
    for (let i = 0; i < grayscaleImage.pixels.length; i += 4) {
      // Extract the red, green, and blue color channels
      const r = grayscaleImage.pixels[i];
      const g = grayscaleImage.pixels[i + 1];
      const b = grayscaleImage.pixels[i + 2];

      // Calculate the grayscale value using the luminance formula
      let gray = r * rCoeff + g * gCoeff + b * bCoeff;

      // Enhance the brightness of the grayscale value
      gray = constrain(gray * brightnessFactor, 0, 255);

      // Set the red, green, and blue channels to the grayscale value
      grayscaleImage.pixels[i] =
        grayscaleImage.pixels[i + 1] =
        grayscaleImage.pixels[i + 2] =
          gray;
    }

    // Update the pixel data of the new image to reflect the changes
    grayscaleImage.updatePixels();
    return grayscaleImage;
  }

  /**
   * Increases the brightness of the current image by a given amount.
   *
   * @param {number} amount - The amount to increase the brightness. Positive values brighten the image.
   * @returns {p5.Image} A new image object with adjusted brightness.
   */
  adjustBrightness(amount) {
    if (!this.isImageSet()) return;
    let brightnessImage = this._createCopy();
    brightnessImage.loadPixels();
    for (let i = 0; i < brightnessImage.pixels.length; i += 4) {
      // Increase brightness for each color channel
      brightnessImage.pixels[i] = constrain(
        brightnessImage.pixels[i] + amount,
        0,
        255
      );
      // Red channel
      brightnessImage.pixels[i + 1] = constrain(
        brightnessImage.pixels[i + 1] + amount,
        0,
        255
      ); // Green channel
      brightnessImage.pixels[i + 2] = constrain(
        brightnessImage.pixels[i + 2] + amount,
        0,
        255
      ); // Blue channel
    }
    brightnessImage.updatePixels();
    return brightnessImage;
  }

  /**
   * Extracts a specific color channel from the current image.
   *
   * This method creates a new image with the same dimensions as the current image,
   * copies the current image into the new image, and then processes each pixel to
   * extract the specified color channel (red, green, or blue).
   *
   * @param {number} channel
   * - The color channel to extract (0 for red, 1 for green, 2 for blue).
   * @returns {p5.Image}
   * A new image object that contains only the specified color channel.
   */
  extractChannel(channel) {
    if (!this.isImageSet()) return;
    // Create a new image with the same dimensions as the current image
    let channelImage = this._createCopy();

    // Load the pixel data of the new image
    channelImage.loadPixels();

    // Iterate over each pixel and extract the specified channel
    for (let i = 0; i < channelImage.pixels.length; i += 4) {
      let colorValue = channelImage.pixels[i + channel];

      // Set the pixel to the channel value for R, G, B channels
      channelImage.pixels[i] = channel === 0 ? colorValue : 0; // Red
      channelImage.pixels[i + 1] = channel === 1 ? colorValue : 0; // Green
      channelImage.pixels[i + 2] = channel === 2 ? colorValue : 0; // Blue
    }

    // Update the pixel data of the new image
    channelImage.updatePixels();

    // Return the new image with the extracted channel
    return channelImage;
  }

  /**
   * Applies a threshold to a specific color channel of the current image.
   *
   * @param {number} thresholdValue - The threshold value to apply.
   * @param {number} channel - The color channel to threshold (0 for red, 1 for green, 2 for blue).
   * @returns {p5.Image} A new image object with the threshold applied to the specified channel.
   */
  applyThreshold(thresholdValue, channel) {
    if (!this.isImageSet()) return;
    let thresholdImage = this._createCopy();

    thresholdImage.loadPixels();
    for (let i = 0; i < thresholdImage.pixels.length; i += 4) {
      let colorValue = thresholdImage.pixels[i + channel];
      let thresholdedValue = colorValue > thresholdValue ? 255 : 0;

      thresholdImage.pixels[i] = channel === 0 ? thresholdedValue : 0; // Red
      thresholdImage.pixels[i + 1] = channel === 1 ? thresholdedValue : 0; // Green
      thresholdImage.pixels[i + 2] = channel === 2 ? thresholdedValue : 0; // Blue
    }

    thresholdImage.updatePixels();
    return thresholdImage;
  }

  /**
   * Creates a copy of the current image.
   *
   * @returns {p5.Image} A new image object that is a copy of the current image.
   */
  _createCopy() {
    let copyImage = createImage(this.image.width, this.image.height);
    copyImage.copy(
      this.image,
      0, // Source x-coordinate
      0, // Source y-coordinate
      this.image.width, // Source width
      this.image.height, // Source height
      0, // Destination x-coordinate
      0, // Destination y-coordinate
      this.image.width, // Destination width
      this.image.height // Destination height
    );
    return copyImage;
  }
}
