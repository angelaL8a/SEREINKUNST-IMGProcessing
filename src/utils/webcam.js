/**
 * @file webcamManager.js
 *
 * This file contains the implementation of the `WebcamManager` class, which provides a way to capture images from a webcam in a web application. It extends the `ImageTool` class, allowing for easy image capture and processing using the webcam feed. The class also allows registering callback functions when a capture event (such as a button click) occurs.
 *
 * Example:
 *
 * ```javascript
 * const videoElement = document.querySelector('#webcam');
 * const webcamManager = new WebcamManager(videoElement, '.capture-btn');
 *
 * webcamManager.onClickCapture(() => {
 *    const capturedImage = webcamManager.captureIMG();
 *    console.log("Captured Image: ", capturedImage);
 * });
 * ```
 *
 * The example above demonstrates how to set up a `WebcamManager` for capturing webcam images, and how to use the `onClickCapture` method to trigger image capture when a button is clicked.
 */

//////////////////////////////////////////////////////////////////
// WebcamManager Implementation
///////////////////////////////////////////////////////////////////

/**
 * The `WebcamManager` class is responsible for managing the webcam feed, capturing images, and triggering events based on user interaction. It extends the `ImageTool` class, inheriting the image processing capabilities.
 */
class WebcamManager extends ImageTool {
  /**
   * Creates an instance of WebcamManager.
   *
   * @param {HTMLVideoElement} videoElement - The video representing the webcam feed.
   * @param {string} cameraClass - The CSS selector for the capture button that triggers the image capture.
   */
  constructor(videoElement, cameraClass) {
    super();
    this.cameraClass = cameraClass;
    this.videoElement = videoElement;
  }

  /**
   * Captures the current frame from the webcam feed.
   *
   * @returns {p5.Image} - The captured image as a p5.js image object.
   */
  captureIMG() {
    return this.captureImage(this.videoElement);
  }

  /**
   * Registers an event listener on the capture button. The provided callback function is triggered when the button is clicked.
   *
   * @param {Function} callback - The function to be executed when the capture button is clicked.
   */
  onClickCapture(callback) {
    document.querySelector(this.cameraClass).addEventListener("click", () => {
      callback();
    });
  }
}
