class ColorConverter {
  /**
   * Method to convert RGB values to HSV.
   *
   * This method uses the standard formula to convert RGB values to HSV values.
   * The RGB values are first normalized to the range [0, 1], and then the HSV
   * values are calculated and scaled back to the range [0, 255].
   *
   * @param {number} r - Red value (0-255).
   * @param {number} g - Green value (0-255).
   * @param {number} b - Blue value (0-255).
   * @returns {number[]} Array containing HSV values [hue, saturation, value].
   */
  rgbToHSV(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      v = max;

    let d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [h * 255, s * 255, v * 255];
  }

  hsvToRgb(h, s, v) {
    let r, g, b;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        (r = v), (g = t), (b = p);
        break;
      case 1:
        (r = q), (g = v), (b = p);
        break;
      case 2:
        (r = p), (g = v), (b = t);
        break;
      case 3:
        (r = p), (g = q), (b = v);
        break;
      case 4:
        (r = t), (g = p), (b = v);
        break;
      case 5:
        (r = v), (g = p), (b = q);
        break;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  /**
   * Method to convert XYZ values to L*a*b.
   *
   * This method first converts RGB values to XYZ values, and then converts
   * the XYZ values to L*a*b values using the standard formulas. The resulting
   * L*a*b values are returned as an array.
   *
   * @param {number} r - Red value (0-255).
   * @param {number} g - Green value (0-255).
   * @param {number} b - Blue value (0-255).
   * @returns {number[]} Array containing L*a*b values [l, a, b].
   */
  rgbToLab(r, g, b) {
    const [x, y, z] = this.rgbToXyz(r, g, b);
    return this.xyzToLab(x, y, z);
  }

  /**
   * Converts RGB values to XYZ color space.
   *
   * This method normalizes the RGB values to the range [0, 1],
   * applies gamma correction, and then converts them to XYZ values.
   *
   * @param {number} r - Red value (0-255).
   * @param {number} g - Green value (0-255).
   * @param {number} b - Blue value (0-255).
   * @returns {number[]} Array containing XYZ values [x, y, z].
   * @private
   */
  rgbToXyz(r, g, b) {
    // Normalize the RGB values
    const _applyGammaCorrection = (channel) =>
      channel > 0.04045
        ? Math.pow((channel + 0.055) / 1.055, 2.4)
        : channel / 12.92;

    r = _applyGammaCorrection(r);
    g = _applyGammaCorrection(g);
    b = _applyGammaCorrection(b);

    r *= 100;
    g *= 100;
    b *= 100;
    // Apply the transformation
    const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
    const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;

    return [x, y, z];
  }

  /**
   * Method to convert RGB values to CMYK.
   *
   * This method uses the standard formula to convert RGB values to CMYK values.
   * The RGB values are first normalized to the range [0, 1], and then the CMYK
   * values are calculated and scaled to the range [0, 255].
   *
   * @param {number} r - Red value (0-255).
   * @param {number} g - Green value (0-255).
   * @param {number} b - Blue value (0-255).
   * @returns {number[]} Array containing CMYK values [cyan, magenta, yellow, black].
   */
  rgbToCMYK(r, g, b) {
    let c = 1 - r / 255;
    let m = 1 - g / 255;
    let y = 1 - b / 255;
    let k = Math.min(c, m, y);

    c = ((c - k) / (1 - k)) * 255;
    m = ((m - k) / (1 - k)) * 255;
    y = ((y - k) / (1 - k)) * 255;
    k = k * 255;

    return [c, m, y, k];
  }

  /**
   * Method to convert RGB values to YCbCr.
   *
   * This method uses the standard formula to convert RGB values to YCbCr values.
   * The RGB values are first normalized to the range [0, 255], and then the YCbCr
   * values are calculated.
   *
   * @param {number} r - Red value (0-255).
   * @param {number} g - Green value (0-255).
   * @param {number} b - Blue value (0-255).
   * @returns {number[]} Array containing YCbCr values [Y, Cb, Cr].
   */
  rgbToYCbCr(r, g, b) {
    // Apply YCbCr conversion formula
    let y = 0.299 * r + 0.587 * g + 0.114 * b;
    let cb = -0.168736 * r - 0.331264 * g + 0.5 * b + 128;
    let cr = 0.5 * r - 0.418688 * g - 0.081312 * b + 128;

    return [y, cb, cr];
  }

  /**
   * Converts XYZ values to L*a*b* color space.
   *
   * This method normalizes the XYZ values, applies the necessary
   * transformations, and then converts them to L*a*b* values.
   *
   * @param {number} x - X value.
   * @param {number} y - Y value.
   * @param {number} z - Z value.
   * @returns {number[]} Array containing L*a*b* values [l, a, b].
   * @private
   */
  xyzToLab(x, y, z) {
    // Normalize the values
    const _normalize = (value, reference) => value / reference;

    x = _normalize(x, 95.047);
    y = _normalize(y, 100.0);
    z = _normalize(z, 108.883);

    // Apply the transformation
    const _f = (t) =>
      t > 0.008856 ? Math.pow(t, 1 / 3) : t * 7.787 + 16 / 116;

    x = _f(x);
    y = _f(y);
    z = _f(z);

    // Convert to L*a*b values
    let l = 116 * y - 16;
    let a = 500 * (x - y);
    let b = 200 * (y - z);

    // Normalize and clamp the values to the range [0, 255]
    l = this._normalizeAndClamp(l, 0, 100, 255);
    a = this._clamp(a + 128, 0, 255);
    b = this._clamp(b + 128, 0, 255);

    return [l, a, b];
  }

  /**
   * Normalizes and clamps a value to a specific range.
   *
   * @param {number} value - The value to normalize and clamp.
   * @param {number} minIn - The input minimum range.
   * @param {number} maxIn - The input maximum range.
   * @param {number} maxOut - The output maximum range.
   * @returns {number} The normalized and clamped value.
   * @private
   */
  _normalizeAndClamp(value, minIn, maxIn, maxOut) {
    const normalized = ((value - minIn) * maxOut) / (maxIn - minIn);
    return this._clamp(normalized, 0, maxOut);
  }

  /**
   * Clamps a value to a specific range.
   *
   * @param {number} value - The value to clamp.
   * @param {number} min - The minimum range.
   * @param {number} max - The maximum range.
   * @returns {number} The clamped value.
   * @private
   */
  _clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }
}
