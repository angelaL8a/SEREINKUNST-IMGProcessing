/**
 * Class representing a Face Detector using ML5.js.
 */
class FaceDetector {
  /**
   * Create a Face Detector.
   * @param {HTMLVideoElement} _video - The video element to detect faces in.
   * @param {Object} _faceMesh - The ML5.js face mesh detection library instance.
   */
  constructor(_video, _faceMesh) {
    this.video = _video;
    this.faceMesh = _faceMesh;
    this.faces = [];
  }

  /**
   * Start the face detection process.
   */
  startDetection() {
    this.faceMesh.detectStart(this.video, this.handleFaces.bind(this));
  }

  /**
   * Handle the detected faces.
   * @param {Array} results - The results from the face mesh detection.
   */
  handleFaces(results) {
    this.faces = results;
  }

  /**
   * Get the detected faces.
   * @returns {Array} The array of detected faces.
   */
  getFaces() {
    return this.faces;
  }

  /**
   * Get the region of a detected face from the video.
   * @param {Object} face - The face object containing face oval coordinates.
   * @returns {Array} An array containing the face image and its coordinates.
   */
  getFaceRegion(face) {
    const x = face.faceOval.x;
    const y = face.faceOval.y;
    const w = face.faceOval.width;
    const h = face.faceOval.height;
    const faceImage = this.video.get(x, y, w, h);
    return [faceImage, { x, y, w, h }];
  }
}
