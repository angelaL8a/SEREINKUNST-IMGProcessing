/**
 * Class for applying a "cute" filter to a face in a canvas.
 * @class
 */
class CuteFilter {
  /**
   * Creates an instance of CuteFilter.
   * @param {CanvasRenderingContext2D} ctx - The 2D drawing context of the canvas.
   * @param {ImageLoader} hatLoader - ImageLoader instance for the hat image.
   * @param {ImageLoader} glassLoader - ImageLoader instance for the glasses image.
   * @param {ImageLoader} blushLoader - ImageLoader instance for the blush image.
   */
  constructor(ctx, hatImageLoader, glassLoader) {
    this.ctx = ctx;
    this.hatLoader = hatLoader;
    this.glassLoader = glassLoader;
    this.blushLoader = blushLoader;
  }

  /**
   * Applies the cute filter to a detected face.
   * @param {Object} face - The face object containing the detected facial features.
   * @param {Object} face.box - The bounding box of the face.
   * @param {Object} face.faceOval - The oval representing the face shape.
   * @param {Object} face.rightEyebrow - The position of the right eyebrow.
   */
  apply(face) {
    this._applyHat(face);
    this._applyBlush(face);
    this._applyGlasses(face);
  }

  /**
   * Applies the hat image on top of the detected face.
   * @param {Object} face - The face object containing the detected facial features.
   * @private
   */
  _applyHat(face) {
    const hatWidth = face.box.width * 1.5;
    const hatHeight = hatWidth * 0.9;
    const hatX = face.box.xMin - face.box.width * 0.2;
    const hatY = face.box.yMin - hatHeight * 0.8;

    this.hatLoader.load((hatImage) => {
      this.ctx.drawImage(hatImage, hatX, hatY, hatWidth, hatHeight);
    });
  }

  /**
   * Applies the blush image on the detected face.
   * @param {Object} face - The face object containing the detected facial features.
   * @private
   */
  _applyBlush(face) {
    const blushWidth = face.box.xMax - face.box.xMin * 0.8;
    const blushHeight = blushWidth * 0.8;
    const blushX = face.box.xMin - face.box.width * 0.2;
    const blushY = face.faceOval.centerY - face.faceOval.height * 0.4;

    this.blushLoader.load((blushImage) => {
      this.ctx.drawImage(blushImage, blushX, blushY, blushWidth, blushHeight);
    });
  }

  /**
   * Applies the glasses image on the detected face.
   * @param {Object} face - The face object containing the detected facial features.
   * @private
   */
  _applyGlasses(face) {
    const glassWidth = face.box.xMax - face.box.xMin * 0.8;
    const glassHeight = glassWidth * 0.9;
    const glassX = face.rightEyebrow.x - glassWidth * 0.2;
    const glassY = face.rightEyebrow.y - glassHeight * 0.3;

    this.glassLoader.load((glassImage) => {
      this.ctx.drawImage(glassImage, glassX, glassY, glassWidth, glassHeight);
    });
  }
}
