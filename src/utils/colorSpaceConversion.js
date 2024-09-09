class ColorSpaceConversion extends ColorConverter {
  constructor(image = null) {
    super();
    this.image = image;
  }
  setImage(image) {
    this.image = image;
  }

  isImageSet() {
    if (this.image) {
      console.log("Image is set.");
      return true;
    } else {
      console.log("No image set. Please set an image first.");
      return false;
    }
  }

  /**
   * Converts the current image to the HSV color space with a threshold applied.
   *
   * This method creates a copy of the current image, processes each pixel to convert
   * its RGB values to HSV values, and then applies a threshold based on the provided
   * threshold value.
   *
   * @param {number} threshold - The threshold value (0-100) to be applied to the V (value) channel.
   * @returns {p5.Image} A new image object in the HSV color space with threshold applied.
   */
  toHSV() {
    if (!this.isImageSet()) return;
    let hsvImage = this._createCopy();
    hsvImage.loadPixels();

    for (let p = 0; p < hsvImage.pixels.length; p += 4) {
      let r = hsvImage.pixels[p];
      let g = hsvImage.pixels[p + 1];
      let b = hsvImage.pixels[p + 2];

      // Convert RGB to HSV
      let [h, s, v] = this.rgbToHSV(r, g, b);

      // Set the new HSV values (converted back to RGB format for p5.js)
      hsvImage.pixels[p] = h; // Hue
      hsvImage.pixels[p + 1] = s; // Saturation
      hsvImage.pixels[p + 2] = v; // Value (Brightness)
    }

    hsvImage.updatePixels();
    return hsvImage;
  }

  toHSVThreshold(threshold = 125) {
    if (!this.isImageSet()) return;
    let hsvImage = this._createCopy();
    hsvImage.loadPixels();

    for (let p = 0; p < hsvImage.pixels.length; p += 4) {
      let r = hsvImage.pixels[p];
      let g = hsvImage.pixels[p + 1];
      let b = hsvImage.pixels[p + 2];

      // Convert RGB to HSV
      let [h, s, v] = this.rgbToHSV(r, g, b);

      // Apply threshold to the V (value) channel
      v = v > threshold ? 255 : 0;

      // Set the new HSV values (converted back to RGB format for p5.js)
      hsvImage.pixels[p] = h; // Hue
      hsvImage.pixels[p + 1] = s; // Saturation
      hsvImage.pixels[p + 2] = v; // Value (Brightness)
    }

    hsvImage.updatePixels();
    return hsvImage;
  }

  /**
   * Converts the current image to the L*a*b color space with a threshold applied.
   *
   * This method creates a copy of the current image, processes each pixel to convert
   * its RGB values to L*a*b values, and then applies a threshold based on the provided
   * threshold value.
   *
   * @param {number} threshold - The threshold value (0-100) to be applied to the L* (lightness) channel.
   * @returns {p5.Image} A new image object in the L*a*b color space with threshold applied.
   */
  toLab() {
    if (!this.isImageSet()) return;
    let labImage = this._createCopy();
    labImage.loadPixels();
    for (let p = 0; p < labImage.pixels.length; p += 4) {
      let r = labImage.pixels[p];
      let g = labImage.pixels[p + 1];
      let b = labImage.pixels[p + 2];
      // Convert RGB to Lab
      let [l, a, bValue] = this.rgbToLab(r, g, b);

      // Set the new L*a*b values (converted back to RGB format for p5.js)
      labImage.pixels[p] = l; // Lightness
      labImage.pixels[p + 1] = a; // a* Green-Red
      labImage.pixels[p + 2] = bValue; // b* Blue-Yellow
    }

    labImage.updatePixels();
    return labImage;
  }

  toLabThreshold(threshold = 128) {
    if (!this.isImageSet()) return;
    let labImage = this._createCopy();
    labImage.loadPixels();
    for (let p = 0; p < labImage.pixels.length; p += 4) {
      let r = labImage.pixels[p];
      let g = labImage.pixels[p + 1];
      let b = labImage.pixels[p + 2];
      // Convert RGB to Lab
      let [l, a, bValue] = this.rgbToLab(r, g, b);

      // Apply threshold to the L* (lightness) channel
      l = l < threshold ? 0 : 255;

      // Set the new L*a*b values (converted back to RGB format for p5.js)
      labImage.pixels[p] = l; // Lightness
      labImage.pixels[p + 1] = a; // a* Green-Red
      labImage.pixels[p + 2] = bValue; // b* Blue-Yellow
    }

    labImage.updatePixels();
    return labImage;
  }

  /**
   * Converts the current image to the CMYK color space.
   *
   * This method creates a copy of the current image, processes each pixel to convert
   * its RGB values to CMYK values, and then updates the pixel data of the new image.
   * The resulting image will have its pixels represented in the CMYK color space.
   *
   * @returns {p5.Image} A new image object in the CMYK color space.
   */
  toCMYK() {
    if (!this.isImageSet()) return;
    let cmykImage = this._createCopy();
    cmykImage.loadPixels();

    for (let p = 0; p < cmykImage.pixels.length; p += 4) {
      let r = cmykImage.pixels[p];
      let g = cmykImage.pixels[p + 1];
      let b = cmykImage.pixels[p + 2];
      //Conver RGB to CMYK
      let [c, m, y, k] = this.rgbToCMYK(r, g, b);

      //Set the new CMYK values (note: CMYK is often stored in different formats, here we store as RGBA)
      cmykImage.pixels[p] = c; //Cyan
      cmykImage.pixels[p + 1] = m; //Magenta
      cmykImage.pixels[p + 2] = y; //Yellow
      cmykImage.pixels[p + 3] = k; //Black (K)
    }

    cmykImage.updatePixels();
    return cmykImage;
  }

  toCMYKThreshold(threshold = 128) {
    if (!this.isImageSet()) return;
    let cmykImage = this._createCopy();
    cmykImage.loadPixels();

    for (let p = 0; p < cmykImage.pixels.length; p += 4) {
      let r = cmykImage.pixels[p];
      let g = cmykImage.pixels[p + 1];
      let b = cmykImage.pixels[p + 2];
      //Conver RGB to CMYK
      let [c, m, y, k] = this.rgbToCMYK(r, g, b);

      //Set threshold
      c = c < threshold ? 0 : 255;

      //Set the new CMYK values (note: CMYK is often stored in different formats, here we store as RGBA)
      cmykImage.pixels[p] = c; //Cyan
      cmykImage.pixels[p + 1] = m; //Magenta
      cmykImage.pixels[p + 2] = y; //Yellow
      cmykImage.pixels[p + 3] = k; //Black (K)
    }

    cmykImage.updatePixels();
    return cmykImage;
  }

  /**
   * Converts the current image to the YCbCr color space.
   *
   * This method creates a copy of the current image, processes each pixel to
   * convert its RGB values to YCbCr values, and then updates the pixel data of
   * the new image. The resulting image will have its pixels represented in the
   * YCbCr color space.
   *
   * @returns {p5.Image} A new image object in the YCbCr color space.
   */
  toYCbCr() {
    if (!this.isImageSet()) return;
    let ycbcrImage = this._createCopy();
    ycbcrImage.loadPixels();

    for (let p = 0; p < ycbcrImage.pixels.length; p += 4) {
      let r = ycbcrImage.pixels[p];
      let g = ycbcrImage.pixels[p + 1];
      let b = ycbcrImage.pixels[p + 2];

      let [y, cb, cr] = this.rgbToYCbCr(r, g, b);

      ycbcrImage.pixels[p] = y;
      ycbcrImage.pixels[p + 1] = cb;
      ycbcrImage.pixels[p + 2] = cr;
      ycbcrImage.pixels[p + 3] = 255; // alpha
    }

    ycbcrImage.updatePixels();
    return ycbcrImage;
  }

  toYCbCrThreshold(threshold = 128) {
    if (!this.isImageSet()) return;
    let ycbcrImage = this._createCopy();
    ycbcrImage.loadPixels();

    for (let p = 0; p < ycbcrImage.pixels.length; p += 4) {
      let r = ycbcrImage.pixels[p];
      let g = ycbcrImage.pixels[p + 1];
      let b = ycbcrImage.pixels[p + 2];

      let [y, cb, cr] = this.rgbToYCbCr(r, g, b);

      // Apply threshold to the Y channel
      // y = y < threshold ? 0 : 255;
      if (y > threshold) {
        cb = min(ycbcrImage.pixels[p + 1] * 1.1, 255) * 2;
        cr = min(ycbcrImage.pixels[p + 2] * 1.1, 255) * 2;
      }

      ycbcrImage.pixels[p] = y;
      ycbcrImage.pixels[p + 1] = cb;
      ycbcrImage.pixels[p + 2] = cr;
      ycbcrImage.pixels[p + 3] = 255; // alpha
    }

    ycbcrImage.updatePixels();
    return ycbcrImage;
  }

  /**
   * Creates a copy of the current image.
   *
   * This method creates a new image with the same dimensions as the current image,
   * and copies the pixel data from the current image to the new image.
   *
   * @returns {p5.Image} A copy of the original image.
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
