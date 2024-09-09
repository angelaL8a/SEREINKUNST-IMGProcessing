/**
 * This file handles events related to face detection in the respective cameras
 * for the Rabbit Filter (Extension), COLORSPACE, and TINSPACE sections. These
 * sections change depending on the camera capture, thresholds, etc.
 *
 * The `handleRabbitModeChange` function is responsible for changing the stickers
 * to see different styles in the Rabbit Filter. The `setupEventHandlers` function
 * sets up all the sections where images are captured to apply filters.
 */

/**
 * Handles the change of Rabbit Mode by updating the stickers (ears, glasses, blush)
 * based on the selected mode.
 *
 * @param {string} mode - The selected Rabbit Mode.
 */
function handleRabbitModeChange(mode) {
  const { ears, glasses, blush } = RABBIT_MODES[mode];
  hatLoader = new ImageLoader(ears);
  glassLoader = new ImageLoader(glasses);
  blushLoader = new ImageLoader(blush);
}

/**
 * Initializes the WebcamManager for each section and sets up the respective spaces.
 */
function setupEventHandlers() {
  const webcamManagerP = new WebcamManager(
    video,
    ".webcam-grayscale-box-icon-camera"
  );
  const webcamManagerCS = new WebcamManager(video, ".webcam-magic-box-camera");

  setUpTintSpace(webcamManagerP);
  setUpColorSpace(webcamManagerCS);
  setUpColorSpaceThreshold(webcamManagerCS);
}
