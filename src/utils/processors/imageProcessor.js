/**
 * The ImageTool class provides utility methods for capturing, converting, and
 * manipulating images using the p5.js library. It includes methods to capture an
 * image from a video feed, convert a p5 image to an HTML image element, append a
 * p5 image to a specified div, and create an empty p5 image.
 */

class ImageTool {
  /**
   * Captures the current frame from the video feed.
   *
   * @param {p5.MediaElement} video - The video element from which to capture the image.
   * @returns {p5.Image} - The captured p5 image.
   */
  captureImage(video) {
    const snapshot = video.get();
    const capturedImage = this._createEmptyImage(
      snapshot.width,
      snapshot.height
    );
    capturedImage.copy(
      snapshot,
      0,
      0,
      snapshot.width,
      snapshot.height,
      0,
      0,
      snapshot.width,
      snapshot.height
    );
    return capturedImage;
  }

  /**
   * Converts a p5 image to an HTML image element.
   *
   * @param {p5.Image} p5Image - The p5 image to be converted.
   * @returns {HTMLImageElement} - The converted HTML image element.
   */
  toHTMLimg(p5Image) {
    const imgElement = document.createElement("img");
    imgElement.src = p5Image.canvas.toDataURL(); // Converting the p5 canvas to DataURL
    return imgElement;
  }

  /**
   * Appends a p5 image element to a specified div.
   *
   * @param {p5.Image} p5Image - The p5 image to be appended as an HTML image.
   * @param {string} divId - The ID of the div where the image should be appended.
   * @param {string} imageClass - The class to assign to the appended image element.
   */
  appendP5ImageToDivByID(p5Image, divId, imageClass) {
    const targetDiv = document.getElementById(divId);
    targetDiv.innerHTML = "";

    const HTMLimg = this.toHTMLimg(p5Image);
    const imgElement = document.createElement("img");
    imgElement.src = HTMLimg.src;
    imgElement.className = imageClass;
    document.getElementById(divId).appendChild(imgElement);
  }

  /**
   * Creates an empty p5 image object.
   *
   * @param {number} width - Width of the image.
   * @param {number} height - Height of the image.
   * @returns {p5.Image} - The empty p5 image.
   */
  _createEmptyImage(width, height) {
    return createImage(width, height); // p5 function to create an empty image
  }
}

/**
 * Class representing an image loader.
 * Handles loading an image from a given source and executing a callback once the
 * image is loaded.
 */
class ImageLoader {
  /**
   * Creates an instance of ImageLoader.
   *
   * @param {string} src - The source URL of the image to be loaded.
   */
  constructor(src) {
    /**
     * The Image object representing the image to be loaded.
     * @type {HTMLImageElement}
     */
    this.image = new Image();
    this.image.src = src;
  }

  /**
   * Loads the image and executes the provided callback function once the image is loaded.
   *
   * @param {Function} callback - The function to be executed once the image is loaded.
   *                              Receives the loaded Image object as an argument.
   */
  load(callback) {
    if (this.image.complete) {
      callback(this.image);
    } else {
      this.image.onload = () => {
        callback(this.image);
      };
    }
  }
}
