/**
 * @file tintSpaceProcessor.js
 *
 * @description
 * This module is responsible for processing and displaying images captured from a
 * webcam with specific focus on tint color channels (red, green, blue) and their
 * threshold adjustments. It includes functionality for:
 *
 * 1. **Tint Color Channel Extraction**:
 *    - Processes and displays images highlighting grayscale, red, green, and blue color channels.
 *    - Utilizes the `TintProcessor` class to handle extraction and display of these channels.
 *
 * 2. **Threshold Filtering**:
 *    - Applies manual thresholding to the red, green, and blue color channels using sliders.
 *    - Implements a `CircularSliderManager` to manage slider controls for threshold adjustments.
 *
 * @classes
 * - `TintProcessor`: Handles image processing and display for grayscale and RGB color channels, applying threshold filters based on slider inputs.
 *
 * @functions
 * - `setUpTintSpace`: Initializes the `TintProcessor` for capturing and processing images with threshold adjustments and setting up sliders.
 *
 * @dependencies
 * - This module relies on the `ImageTool`, `CircularSliderManager`, and `WebcamManager` classes.
 * - p5.js is used for image capture and processing.
 *
 * @usage
 * - To use this module, instantiate `WebcamManager` and call `setUpTintSpace` with the instance.
 */

/**
 * @constant {number} INIT_TINT_VAL_SLIDER
 * @description
 * Defines the initial value of the circular sliders that control the tint threshold levels
 * for different color channels (red, green, blue). This value is set to provide a default
 * starting point for the sliders.
 */
const INIT_TINT_VAL_SLIDER = 120;

/**
 * @constant {Object} TINT_COLORS_THRESHOLD
 * @description
 * A dynamically generated object that holds configuration data for red, green, and blue
 * threshold sliders. Each key is constructed from the color channel name (e.g., 'RED_THRESHOLD'),
 * and each entry contains references to the associated HTML container, slider elements, and
 * the respective channel index.
 */
const TINT_COLORS_THRESHOLD = CHANNELS.reduce((acc, color) => {
  const key = `${color.toUpperCase()}_THRESHOLD`;
  acc[key] = {
    channel: CHANNEL_INDEX[key],
    ...SLIDER_CONFIG(color),
  };
  return acc;
}, {});
/**
 * @constant {Object} TINT_COLORS
 * @description
 * Combines configurations for both the base tint color containers (grayscale, red, green, blue channels)
 * and the threshold-adjustable tint colors (red, green, blue). This object maps processed images to the
 * corresponding containers in the DOM.
 */
const TINT_COLORS = {
  ...TINT_COLORS_BASE,
  ...TINT_COLORS_THRESHOLD,
};

/**
 * @class TintProcessor
 * @extends ImageTool
 * @description The TintProcessor class handles the conversion of webcam images into
 * various color spaces and applies threshold filters based on user-controlled sliders
 * It is responsible for capturing images, applying color filters, and updating the associated DOM elements.
 *
 * @param {Object} converter - An instance of a converter that handles the transformation of the image (e.g., converting to grayscale, extracting RGB channels).
 * @param {Object} sliders - A collection of slider instances, each associated with a color channel (red, green, blue).
 * @param {Object} containers - A collection of DOM containers where the processed images will be displayed.
 * @param {number} initialValue - The initial value for the sliders controlling the threshold level for each color channel.
 */
class TintProcessor extends ImageTool {
  constructor(converter, sliders, containers, initialValue) {
    super();
    this.converter = converter;
    this.sliders = sliders;
    this.containers = containers;
    this.initialValue = initialValue;
  }

  /**
   * @method captureAndProcessImage
   * @description Captures the current image from the webcam and processes it by
   * applying various color space transformations and threshold filters. The processed
   * images are then updated in their respective DOM containers.
   *
   * @param {p5.Image} imageP5 - The p5.js image object captured from the webcam,
   * containing pixel data to be processed.
   * @param {boolean} resetSliders - Optional parameter. If true, resets the sliders
   * to their initial values after capturing the image.
   */
  captureAndProcessImage(imageP5, resetSliders = false) {
    this.converter.setImage(imageP5);

    // Reset slider values to initial state if specified.
    if (resetSliders) {
      Object.values(this.sliders).forEach((slider) =>
        slider.setValue(this.initialValue)
      );
    }

    // Generate processed images for each color space and threshold value.
    const processedImages = {
      GRAYSCALE: this.converter.toGrayscale(),
      RED_CHANNEL: this.converter.extractChannel(0),
      GREEN_CHANNEL: this.converter.extractChannel(1),
      BLUE_CHANNEL: this.converter.extractChannel(2),
      RED_THRESHOLD: this.converter.applyThreshold(
        this.sliders.RED_THRESHOLD.getValue(),
        0
      ),
      GREEN_THRESHOLD: this.converter.applyThreshold(
        this.sliders.GREEN_THRESHOLD.getValue(),
        1
      ),
      BLUE_THRESHOLD: this.converter.applyThreshold(
        this.sliders.BLUE_THRESHOLD.getValue(),
        2
      ),
    };

    // Update the DOM elements with the processed images.
    this.updateImages(processedImages);
  }

  /**
   * @method updateImages
   * @description Updates the HTML containers with the provided processed images.
   * This method is called whenever new images are generated (e.g., after applying
   * threshold filters or converting to grayscale).
   *
   * @param {Object} images - A dictionary containing the processed images, where the
   * keys represent different color spaces (e.g., 'GRAYSCALE', 'RED_CHANNEL',
   * 'RED_THRESHOLD') and the values are the corresponding p5.js image objects.
   */
  updateImages(images) {
    Object.keys(images).forEach((colorSpace) => {
      this.appendP5ImageToDivByID(
        images[colorSpace],
        this.containers[colorSpace].image.container,
        this.containers[colorSpace].image.class
      );
    });
  }
}

function setUpTintSpace(webcamManager) {
  const slidersContainer = document.getElementById("sliders-container");
  // Hide the sliders until an image is captured.
  slidersContainer.style.visibility = "hidden";

  // Initialize the slider manager to handle user interaction with the sliders.
  const sliderManager = new CircularSliderManager(
    TINT_COLORS_THRESHOLD,
    ["red", "green", "blue"],
    slidersContainer
  );

  // Initialize the tint processor to handle image capture and processing
  const tintProcessor = new TintProcessor(
    TINT,
    sliderManager.sliders,
    TINT_COLORS,
    INIT_TINT_VAL_SLIDER
  );

  // Set up the capture button to trigger image capture and processing.
  webcamManager.onClickCapture(() => {
    const tmp_label = document.getElementById("temporal-label-threshold");
    if (tmp_label) tmp_label.remove();
    // Make the sliders visible once an image is captured.
    slidersContainer.style.visibility = "visible";
    tintProcessor.captureAndProcessImage(webcamManager.captureIMG(), true);
  });

  // Register events to update images in real-time as sliders are adjusted.
  sliderManager.registerEvents((space, value, channel) => {
    const thresholdImage = TINT.applyThreshold(value, channel);
    tintProcessor.updateImages({
      [`${space.toUpperCase()}`]: thresholdImage,
    });
  });
}
