/**
 * @constant {number} FACEvideo_WIDTH
 * @description The width of the face video capture in pixels. This is used to set the
 * dimensions of the video input for face detection.
 */
const FACEvideo_WIDTH = 160;

/**
 * @constant {number} FACEvideo_HEIGHT
 * @description The height of the face video capture in pixels. This is used to set the
 * dimensions of the video input for face detection.
 */
const FACEvideo_HEIGHT = 120;

const FACEimages_WIDTH = 160 * 3;
const FACEimages_HEIGHT = 120 * 3;

/**
 * @constant {Object} filterNames
 * @description An object mapping numeric keys to effect names. This mapping is used to
 * associate key codes with specific image processing effects. The keys are strings representing
 * numeric values, and the values are the names of the effects to be applied.
 * @type {Object}
 * @property {string} 1 - The name of the grayscale effect.
 * @property {string} 2 - The name of the blur effect.
 * @property {string} 3 - The name of the HSV color space effect.
 * @property {string} 4 - The name of the Lab color space effect.
 * @property {string} 5 - The name of the CMYK color space effect.
 * @property {string} 6 - The name of the pixelation effect with grayscale.
 * @property {string} 7 - The name of the pixelation effect with color.
 */
const filterNames = {
  1: "grayscale",
  2: "blur",
  3: "HSV",
  4: "Lab",
  5: "CMYK",
  6: "pixelationGray",
  7: "pixelationColor",
};

/**
 * @constant {Object} effectHandlers
 * @description An object mapping effect names to their respective processing functions.
 * Each function is responsible for applying a specific image processing effect. Functions
 * that require a face parameter are designed to process the face image, while others
 * process the current image set in the CONVERTER or PROCESSOR.
 * @type {Object}
 * @property {Function} grayscale - Applies the grayscale effect to the image using the PROCESSOR.
 * @property {Function} blur - Applies the blur effect to the face image using the EFFECT.
 * @property {Function} HSV - Converts the image to the HSV color space using the CONVERTER.
 * @property {Function} Lab - Converts the image to the Lab color space using the CONVERTER.
 * @property {Function} CMYK - Converts the image to the CMYK color space using the CONVERTER.
 * @property {Function} pixelationGray - Applies grayscale pixelation to the face image using the EFFECT.
 * @property {Function} pixelationColor - Applies color pixelation to the face image using the EFFECT.
 */
const effectHandlers = {
  grayscale: () => TINTFace.toGrayscale(),
  blur: (face) => EFFECTFace.applyBlur(face, 5),
  HSV: () => CONVERTERFace.toHSV(),
  Lab: () => CONVERTERFace.toLab(),
  CMYK: () => CONVERTERFace.toCMYK(),
  pixelationGray: (face) => EFFECTFace.applyPixelationGrayScale(face, 5),
  pixelationColor: (face) => EFFECTFace.applyPixelationColor(face, 5),
};

///////////////////////////////////////////////////////////////////
// RABBIT CONSTANTS
///////////////////////////////////////////////////////////////////
/**
 * An object containing configurations for different Rabbit Filter modes.
 * Each mode includes paths to the assets for ears, glasses, and blush stickers.
 *
 * @type {Object.<string, {ears: string, glasses: string, blush: string}>}
 */
const RABBIT_MODES = {
  MODE_1: {
    ears: "assets/custom/ear1.png",
    glasses: "assets/custom/glass1.png",
    blush: "assets/custom/blush1.png",
  },
  MODE_2: {
    ears: "assets/custom/ear2.png",
    glasses: "assets/custom/glass2.png",
    blush: "assets/custom/blush2.png",
  },
  MODE_3: {
    ears: "assets/custom/ear3.png",
    glasses: "assets/custom/glass3.png",
    blush: "assets/custom/blush3.png",
  },
};

//////////////////////////////////////////////////////////////////
// TINTSPACE CONSTANTS
///////////////////////////////////////////////////////////////////
/**
 * @constant {Function} SLIDER_CONFIG
 * @description
 * A function that generates configuration settings for circular sliders based on the specified color.
 * Each configuration includes the selectors and initial values required for creating and managing the slider UI elements.
 *
 * @param {string} color - The color name (e.g., 'red', 'green', 'blue') for which the slider configuration is to be generated.
 * @returns {Object} Configuration object for the slider and its associated image.
 * @property {Object} image - Contains the container ID and class for the slider image.
 * @property {Object} slider - Contains selectors for the slider's knob, pointer, and progress, as well as the initial value.
 */
const SLIDER_CONFIG = (color) => ({
  image: {
    container: `threshold-oval-${color}`,
    class: `threshold-oval-image`,
  },
  slider: {
    knobSelector: `.circular-knob-${color}`,
    pointerSelector: `.circular-pointer-${color}`,
    progressSelector: `circular-progress-${color}`,
    initialValue: INIT_TINT_VAL_SLIDER,
  },
});

/**
 * @constant {Array<string>} CHANNELS
 * @description
 * An array containing the names of the color channels.
 * The channels included are 'red', 'green', and 'blue'.
 */
const CHANNELS = ["red", "green", "blue"];

/**
 * @constant {Object} CHANNEL_INDEX
 * @description
 * A mapping object that associates color channel names with their respective index values.
 * This is used to reference specific color channels when applying threshold filters.
 *
 * @property {number} RED_THRESHOLD - Index for the red color channel.
 * @property {number} GREEN_THRESHOLD - Index for the green color channel.
 * @property {number} BLUE_THRESHOLD - Index for the blue color channel.
 */
const CHANNEL_INDEX = {
  RED_THRESHOLD: 0,
  GREEN_THRESHOLD: 1,
  BLUE_THRESHOLD: 2,
};

/**
 * @constant {Object} TINT_COLORS_BASE
 * @description
 * A configuration object mapping the base tint color containers to their respective DOM class names and container IDs.
 * This includes settings for grayscale and individual RGB color channels.
 *
 * @property {Object} GRAYSCALE - Configuration for the grayscale image container.
 * @property {Object} RED_CHANNEL - Configuration for the red channel image container.
 * @property {Object} GREEN_CHANNEL - Configuration for the green channel image container.
 * @property {Object} BLUE_CHANNEL - Configuration for the blue channel image container.
 */
const TINT_COLORS_BASE = {
  GRAYSCALE: {
    image: { container: "grayscale-box", class: "grayscale-image" },
  },
  RED_CHANNEL: {
    image: { container: "red-channel-box", class: "red-channel-image" },
  },
  GREEN_CHANNEL: {
    image: { container: "green-channel-box", class: "green-channel-image" },
  },
  BLUE_CHANNEL: {
    image: { container: "blue-channel-box", class: "blue-channel-image" },
  },
};
