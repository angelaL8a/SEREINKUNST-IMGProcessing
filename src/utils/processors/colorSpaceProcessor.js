/**
 * @file colorSpaceProcessors.js
 *
 * @description
 * This module is responsible for processing and displaying images captured from a
 * webcam using various color spaces. It includes functionality for:
 *
 * 1. **Color Space Conversion**:
 *    - Processes and displays images in different color spaces including HSV, LAB, CMYK, and YCbCr.
 *    - Utilizes a `ColorSpaceProcessor` class to handle conversion and display.
 *
 * 2. **Threshold Filtering**:
 *    - Applies manual thresholding to images using sliders for the aforementioned color spaces.
 *    - Implements a `ColorSpaceProcessorThreshold` class to manage thresholding and display the filtered images.
 *
 * @classes
 * - `ColorSpaceProcessor`: Handles image conversion into HSV, LAB, CMYK, and YCbCr color spaces.
 * - `ColorSpaceProcessorThreshold`: Extends `ColorSpaceProcessor` functionality by applying threshold filters with slider controls.
 *
 * @functions
 * - `setUpColorSpace`: Initializes the `ColorSpaceProcessor` for capturing and processing images in various color spaces.
 * - `setUpColorSpaceThreshold`: Sets up the `ColorSpaceProcessorThreshold` with slider controls for threshold filtering.
 *
 * @dependencies
 * - This module relies on the `ImageTool`, `FlatSliderManager`, and `WebcamManager` classes.
 * - p5.js is used for image capture and processing.
 *
 * @usage
 * - To use this module, instantiate `WebcamManager` and call `setUpColorSpace` or `setUpColorSpaceThreshold` with the instance.
 */

//////////////////////////////////////////////////////////////////
// COLOR SPACE CONSTANTS
///////////////////////////////////////////////////////////////////
/**
 * @constant INIT_VAL_SLIDER
 * @type {number}
 * @default 128
 * @description
 * The initial value for sliders used in color space thresholding. This value is set to the midpoint of the slider range.
 */
const INIT_VAL_SLIDER = 128;
/**
 * @constant SPACE_COLORS
 * @type {object}
 * @property {object} HSV - Configuration for the HSV color space.
 * @property {object} LAB - Configuration for the LAB color space.
 * @property {object} CMYK - Configuration for the CMYK color space.
 * @property {object} YCbCr - Configuration for the YCbCr color space.
 *
 * @description
 * Defines the container and class names for displaying images in different color spaces. This object maps color space names to their respective HTML container IDs and CSS class names.
 */
const SPACE_COLORS = {
  HSV: { image: { container: "HSV-box", class: "HSV-image" } },
  LAB: { image: { container: "LAB-box", class: "LAB-image" } },
  CMYK: { image: { container: "CMYK-box", class: "CMYK-image" } },
  YCbCr: { image: { container: "YCbCr-box", class: "YCbCr-image" } },
};
/**
 * @constant SPACE_COLORS_THRESHOLD
 * @type {object}
 * @property {object} HSV_threshold - Configuration for HSV color space with thresholding.
 * @property {object} Lab_threshold - Configuration for LAB color space with thresholding.
 * @property {object} CMYK_threshold - Configuration for CMYK color space with thresholding.
 * @property {object} YCbCr_threshold - Configuration for YCbCr color space with thresholding.
 *
 * @description
 * Defines the container, class names, and slider settings for applying threshold filters to images in different color spaces. This object maps each color space threshold configuration to its HTML container IDs, slider properties, and CSS class names.
 */
const SPACE_COLORS_THRESHOLD = {
  HSV_threshold: {
    image: {
      container: "HSV-box-threshold",
      class: "HSV-image-threshold",
    },
    slider: {
      containerID: "slider-colorspace-HSV",
      initialValue: INIT_VAL_SLIDER,
      step: 5,
      min: 0,
      max: 255,
      className: "flat-slider-container",
      inputClass: "flat-slider",
      labelClass: "flat-slider-label",
    },
  },
  Lab_threshold: {
    image: {
      container: "LAB-box-threshold",
      class: "LAB-image-threshold",
    },
    slider: {
      containerID: "slider-colorspace-LAB",
      initialValue: INIT_VAL_SLIDER,
      step: 5,
      min: 0,
      max: 255,
      className: "flat-slider-container",
      inputClass: "flat-slider",
      labelClass: "flat-slider-label",
    },
  },
  CMYK_threshold: {
    image: {
      container: "CMYK-box-threshold",
      class: "CMYK-image-threshold",
    },
    slider: {
      containerID: "slider-colorspace-CMYK",
      initialValue: INIT_VAL_SLIDER,
      step: 5,
      min: 0,
      max: 255,
      className: "flat-slider-container",
      inputClass: "flat-slider",
      labelClass: "flat-slider-label",
    },
  },
  YCbCr_threshold: {
    image: {
      container: "YCbCr-box-threshold",
      class: "YCbCr-image-threshold",
    },
    slider: {
      containerID: "slider-colorspace-YCbCr",
      initialValue: INIT_VAL_SLIDER,
      step: 5,
      min: 0,
      max: 255,
      className: "flat-slider-container",
      inputClass: "flat-slider",
      labelClass: "flat-slider-label",
    },
  },
};

//////////////////////////////////////////////////////////////////
// COLOR SPACE IMPLEMENTATION
///////////////////////////////////////////////////////////////////

/**
 * @class ColorSpaceProcessor
 * Handles the processing of images into various color spaces.
 *
 * @param {object} converter - An instance of a color space conversion tool.
 * @param {object} containers - Defines the containers for each color space.
 */
class ColorSpaceProcessor extends ImageTool {
  constructor(converter, containers) {
    super();
    this.converter = converter;
    this.containers = containers;
  }

  /**
   * Captures the current image from the webcam and processes it into different color spaces.
   * @param {p5.Image} imageP5 - The captured image object from p5.js.
   */
  captureAndProcessImage(imageP5) {
    this.converter.setImage(imageP5);

    const processedImages = {
      HSV: this.converter.toHSV(),
      LAB: this.converter.toLab(),
      CMYK: this.converter.toCMYK(),
      YCbCr: this.converter.toYCbCr(),
    };

    this.updateImages(processedImages);
  }

  /**
   * Updates the DOM by appending the processed images to their respective containers.
   * @param {object} images - A collection of processed images in different color spaces.
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

//////////////////////////////////////////////////////////////////
// COLOR SPACE THRESHOLD IMPLEMENTATION
///////////////////////////////////////////////////////////////////

/**
 * @class ColorSpaceProcessorThreshold
 * Extends the ColorSpaceProcessor functionality by applying threshold filters using sliders.
 *
 * @param {object} converter - An instance of a color space conversion tool.
 * @param {object} sliders - Defines the threshold sliders for each color space.
 * @param {object} containers - Defines the containers for each threshold color space.
 */
class ColorSpaceProcessorThreshold extends ImageTool {
  constructor(converter, sliders, containers) {
    super();
    this.converter = converter;
    this.sliders = sliders;
    this.containers = containers;
  }

  /**
   * Captures the image from the webcam and applies the threshold filters.
   * Optionally resets the sliders.
   *
   * @param {p5.Image} imageP5 - The captured image object from p5.js.
   * @param {boolean} resetSliders - If true, resets all sliders to their initial values.
   */
  captureAndProcessImage(imageP5, resetSliders = false) {
    this.converter.setImage(imageP5);

    if (resetSliders) {
      Object.values(this.sliders).forEach((slider) => slider.reset());
    }

    const processedImages = this.processSliders();
    this.updateImages(processedImages);
  }

  /**
   * Processes the images based on the current slider values for each color space threshold.
   * @returns {object} - A collection of processed images for each color space threshold.
   */
  processSliders() {
    return Object.keys(this.sliders).reduce((acc, space) => {
      const value = this.sliders[space].getValue();
      const spaceKey = space.replace("_threshold", "");

      if (typeof this.converter[`to${spaceKey}`] === "function") {
        acc[spaceKey] = this.converter[`to${spaceKey}Threshold`](value);
      } else {
        console.error(`Conversion method for ${spaceKey} not found.`);
      }
      return acc;
    }, {});
  }

  /**
   * Processes the value of a slider for a given color space and converts it using the appropriate method.
   *
   * @param {string} space - The identifier of the slider and color space to process.
   * @returns {Object} An object containing the converted value for the color space.
   *                   If the conversion method is not found, returns an empty object.
   */
  processSlider(space) {
    const value = this.sliders[space].getValue();
    const spaceKey = space.replace("_threshold", "");

    // Check if the conversion method exists for the color space
    if (typeof this.converter[`to${spaceKey}`] === "function") {
      return {
        [spaceKey]: this.converter[`to${spaceKey}Threshold`](value),
      };
    } else {
      console.error(`Conversion method for ${spaceKey} not found.`);
      return {};
    }
  }

  /**
   * Updates the DOM by appending the processed images with thresholding to their respective containers.
   * @param {object} images - A collection of processed images in different color spaces.
   */
  updateImages(images) {
    Object.keys(images).forEach((colorSpace) => {
      const thresholdKey = `${colorSpace}_threshold`;

      if (
        this.containers[thresholdKey] &&
        this.containers[thresholdKey].image
      ) {
        this.appendP5ImageToDivByID(
          images[colorSpace],
          this.containers[thresholdKey].image.container,
          this.containers[thresholdKey].image.class
        );
      } else {
        console.error(`Image container not found for ${thresholdKey}`);
      }
    });
  }

  /**
   * Updates a single image in response to a change in the slider value.
   * @param {string} space - The color space key corresponding to the slider.
   */
  updateSingleImage(space) {
    const processedImage = this.processSlider(space);
    this.updateImages(processedImage);
  }
}

//////////////////////////////////////////////////////////////////
// SETUP FUNCTIONS FOR PROCESSORS
///////////////////////////////////////////////////////////////////

/**
 * @function setUpColorSpace
 * Initializes the ColorSpaceProcessor by setting up webcam image capture
 * and processing color space conversions upon image capture.
 *
 * @param {WebcamManager} webcamManager - An instance of the WebcamManager to capture images.
 */
function setUpColorSpace(webcamManager) {
  const spaceProcessor = new ColorSpaceProcessor(CONVERTER, SPACE_COLORS);

  webcamManager.onClickCapture(() => {
    spaceProcessor.captureAndProcessImage(webcamManager.captureIMG());
  });
}

/**
 * @function setUpColorSpaceThreshold
 * Initializes the ColorSpaceProcessorThreshold for color space threshold processing with sliders.
 * Registers slider event listeners and enables sliders on image capture.
 *
 * @param {WebcamManager} webcamManager - An instance of the WebcamManager to capture images.
 */
function setUpColorSpaceThreshold(webcamManager) {
  const sliderManager = new FlatSliderManager(SPACE_COLORS_THRESHOLD);
  const colorSpaceProcessorThreshold = new ColorSpaceProcessorThreshold(
    CONVERTER,
    sliderManager.sliders,
    SPACE_COLORS_THRESHOLD
  );

  const sliderContainers = document.querySelectorAll(".slider-colorspace");
  sliderContainers.forEach((slider) => slider.classList.add("disabled"));

  sliderManager.registerEvents((activeSlider) => {
    colorSpaceProcessorThreshold.updateSingleImage(activeSlider);
  });

  webcamManager.onClickCapture(() => {
    const sliderContainers = document.querySelectorAll(".slider-colorspace");
    sliderContainers.forEach((slider) => slider.classList.remove("disabled"));

    colorSpaceProcessorThreshold.captureAndProcessImage(
      webcamManager.captureIMG(),
      true
    );
  });
}
