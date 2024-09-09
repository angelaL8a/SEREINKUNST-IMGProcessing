/**
 * ¬ RGB Channel vs. Thresholding for each channel
 * @class ImageProcessor → @function extractChannel(channel)
 * @class ImageProcessor → @function applyThreshold(value,channel)
 *
 * Each channel in an RGB image (Red, Green, Blue) stores intensity information
 * specific to that color. The intensity values differ for each pixel based on the
 * light, the physical characteristics of the photographed object, and the
 * environmental conditions. When applying thresholding to each channel individually,
 * the results will vary due to these differences in intensity.
 *
 * Mathematically, thresholding is a step function applied to the pixel intensity
 * values. The process can be expressed as: T(I)= 255 if if I > Threshold 0 otherwise
 *
 * ! Red Channel (R)
 * Areas with predominantly red elements will have higher intensities in this channel.
 * When applying a threshold, any intensity value above the set threshold will turn
 * white (255), while values below the threshold will turn black (0). In regions where
 * red is not prominent, this channel will show little response, resulting in more
 * black pixels
 *
 * * Green Channel (G)
 * Similar to the red channel but represents the intensity of green
 * elements. This channel will differ significantly in images with vegetation or
 * green-dominant objects. Additionally, due to the human eye's higher sensitivity to
 * green, the green channel might reveal more details compared to the red channel.
 *
 * ? Blue Channel (B)
 * The blue channel typically exhibits lower intensity in natural images, as blue elements (e.g., the sky) are less frequent in close-up objects. In scenes where blue
 * is not predominant, this channel will display more thresholded black areas.
 *
 *
 * THEREFORE...
 * The images resulting from thresholding applied to different color channels will
 * look distinct due to the variations in how each channel distributes intensity
 * across the image. For example, if an image contains more red components than green
 * or blue, thresholding the red channel will reveal more white areas compared to the
 * other channels. Conversely, channels with lower intensity (e.g., blue in an image
 * dominated by reds or greens) will result in more thresholded black areas.
 */

/**
 * ¬ Thresholding results in HSV and YCbCr Color Spaces
 * @class ColorSpaceConversion → @function toLabThreshold(threshold)
 * @class ColorSpaceConversion → @function toYcbcrThreshold(threshold)
 *
 * * HSV vs. RGB Thresholding
 * In the HSV (Hue, Saturation, Value) color model, thresholding is typically applied
 * to the Value (V) channel, which represents the brightness or intensity of the
 * color. This is different from RGB, where each of the channels (R, G, B) represents
 * color intensity directly. Since the V channel in HSV separates color (Hue) from
 * brightness, thresholding on the V channel can effectively segment images based on
 * lightness and darkness without being affected by the color composition (hue). As a
 * result, images thresholded in HSV space often exhibit more meaningful segmentation
 * of shadows and highlights compared to RGB thresholding, especially in cases of
 * low-contrast images where RGB thresholding might fail to produce clean segmentation.
 *    Noise Comparison: In the RGB model, applying a threshold to each channel
 *    separately can produce significant noise, especially in areas where one or two
 *    channels dominate but do not cross the threshold. In contrast, HSV thresholding
 *    on the V channel typically results in smoother and less noisy segmentation, as it
 *    accounts for the aggregate brightness of the pixel.
 *
 * * YCbCr vs. RGB Thresholding
 * The YCbCr model separates the image into luminance (Y) and chrominance components
 * (Cb and Cr). The Y channel is responsible for luminance, similar to the V channel
 * in HSV, while Cb and Cr handle color information. When thresholding on the Y
 * channel, we focus on the brightness, similar to the V channel in HSV but in a
 * different transformation space. The chroma components (Cb, Cr) are not influenced
 * by the overall light intensity, making YCbCr a more efficient space for isolating
 * brightness-related features without affecting color saturation.
 *    Noise Comparison: Compared to RGB, YCbCr thresholding is less noisy in the
 *    luminance (Y) channel, as it captures overall brightness more naturally.
 *    However, the potential manipulation of Cb and Cr components (as seen in the code
 *    example where these are scaled) can introduce artificial color distortion,
 *    leading to noisy edges or pixel artifacts. This is particularly noticeable in
 *    regions where colors shift dramatically between adjacent pixels, as small
 *    changes in Cb and Cr values may exaggerate these differences post-thresholding.
 *
 * THEREFORE...
 * RGB thresholding tends to produce more noise because it isolates each channel
 * independently. This leads to fragmented thresholding results, especially in areas
 * where one color dominates, but the other channels fail to meet the threshold. In
 * contrast, HSV and YCbCr focus on brightness in the V and Y channels, leading to
 * smoother transitions between thresholded and non-thresholded areas. HSV, in
 * particular, offers a more intuitive separation of brightness from color, reducing
 * noise in the thresholded image.
 */

/**
 * ! PROBLEMS FACED
 * Artistic and Technical outcomes
 * One of the most significant challenges I encountered was ensuring that each filter
 * not only applied a mathematical transformation to the image but also conveyed a
 * sense of artistic intention. My goal was to reflect how saturation, lighting, and
 * color vibrance interact to evoke different emotional responses, which is crucial
 * when applying filters.
 *
 * Threshold Filters
 * When dealing with threshold-based filters, particularly for color space such as
 * YCbCr, the challenge was to make these thresholds reflect transitions in
 * the image that carried artistic and interpretative value. Initially, the threshold
 * application resulted in overly binary outputs, which lacked nuance and made the
 * image appear crude or heavily posterized.
 * To resolve this, I implemented a dynamic approach to thresholding, where
 * adjustments in the slider would simultaneously adjust neighboring channels in a way
 * that maintained coherence. For example, modifying the Y (luminance) value while
 * dynamically recalculating the Cb and Cr components led to more natural results.
 *
 * Multi-Canvas Structure
 * A key architectural challenge was splitting the visual representation of different
 * filters across multiple canvases. Rather than using a single P5.js canvas for all
 * filters, I opted to create distinct HTML5 canvases for each filter. This allowed
 * each processed image to be visualized independently, reflecting the unique
 * properties of each filter.
 */

/**
 * !STATUS AND ISSUES
 * Overall, I am satisfied with the progress and results of my project. All the color
 * space conversions and filter applications were successfully implemented. However,
 * one of the key issues that emerged was with the LAB filter implementation,
 * specifically in its handling of thresholding. Unlike the more straightforward RGB
 * or HSV spaces, the LAB color space can be challenging to work with due to its
 * non-linear perceptual representation. When applying a threshold to the L channel in
 * particular, I noticed a lack of dominant change in the final output, which resulted
 * in the image exhibiting inconsistencies or what I refer to as "variance
 * desynchronization." So, rather than applying a static threshold across the entire
 * image, an adaptive thresholding method based on local contrast or edge detection
 * could be more effective.
 */

/**
 * ¬ EXTENSION OVERVIEW
 * The original project specification requested the implementation of only two filters
 * within the color conversion section. However, I extended this by incorporating two
 * additional filters, LAB and CMYK, for perceptual color balance in LAB and the
 * application of printing standards in CMYK.
 *
 * Furthermore, I implemented an artistic and playful filter: the "Rabbit Cute"
 * filter. This filter goes beyond conventional color conversions by adding
 * dynamically positioned stickers—specifically, cute elements like hats and
 * glasses—directly onto the detected face. What makes this filter unique is the three
 * distinct styles it offers, allowing for flexibility and customization, while
 * maintaining high accuracy in positioning the stickers. The stickers are applied
 * based on real-time face recognition using the ML5 library, which ensures the
 * stickers align precisely with key facial landmarks such as the eyes, mouth, and
 * forehead.
 *
 * * IMPORTANT:
 * Instead of adopting a grid layout system to organize the various sections, I opted
 * for an independent structure for each filter using HTML and CSS. This decision was
 * motivated both by considerations of visual clarity and by the need to emphasize the
 * unique purpose of each filter. So, JavaScript was employed to dynamically add the
 * this HTML code for each section, as well as to handle event-driven interactions,
 * ensuring that the structure remains clean, reusable, and scalable.
 *
 */

/**
 * Structure of the project → structure/structure.js
 */

let video; // The video capture element for streaming live video from the webcam.
let webcamCanvas, grayscaleCanvas; // Canvas elements for different processing stages.
let webcamCtx, webcamCtx2, webcamCtx3, webcamCtx4;
// 2D rendering contexts for the canvas elements.

let faceMesh; // The face mesh model for detecting facial landmarks.
let options = { maxFaces: 2, refineLandmarks: false, flipped: false };
// Options for face mesh model.
let faceDetector; // The face detector instance for face detection and processing.
let faces = []; // Array to store detected faces.

let CONVERTER, EFFECT, TINT;
// Instances for different image processing classes.
let CONVERTERFace, EFFECTFace, TINTFace;
// Instances for face-specific image processing classes.

// images for RABBIT FILTER (extension)
let hatLoader; // ImageLoader instance for loading hat images.
let glassLoader; // ImageLoader instance for loading glasses images.
let blushLoader; // ImageLoader instance for loading blush images.

let currentEffect = "none"; // Current image processing effect applied.

function preload() {
  /**
   * Preloads necessary models and assets before setup.
   */
  faceMesh = ml5.faceMesh(options);
  // Initialize face mesh model with specified options.
}

function setup() {
  /**
   * Sets up the canvas, video capture, and processing components.
   */
  createCanvas(0, 0);
  background(0);
  pixelDensity(1); // Set pixel density to 1 for better performance

  video = createCapture(VIDEO);
  video.size(FACEimages_WIDTH, FACEimages_HEIGHT);
  video.hide();

  faceDetector = new FaceDetector(video, faceMesh);

  CONVERTER = new ColorSpaceConversion();
  EFFECT = new ImageEffects();
  TINT = new ImageProcessor();

  CONVERTERFace = new ColorSpaceConversion();
  EFFECTFace = new ImageEffects();
  TINTFace = new ImageProcessor();

  setupEventHandlers(); // Set up event handlers for user interactions and controls.

  keyboardControls = new KeyboardControls(faces, filterNames, (effect) => {
    currentEffect = effect; // Update the current effect based on user input.
  });
  // Register event listeners for keyboard controls.
  keyboardControls.registerEventListener();

  // Create and configure canvas to use as WEBCAM (grayscale and RGB channel filters).
  webcamCanvas = document.createElement("canvas");
  webcamCanvas.width = FACEvideo_WIDTH;
  webcamCanvas.height = FACEvideo_HEIGHT;
  webcamCanvas.className = "webcam-canvas";
  webcamCtx = webcamCanvas.getContext("2d");
  document.getElementById("webcam-box").appendChild(webcamCanvas);

  // Create and configure canvas to use as WEBCAM (HSV, LAB, CMYK, YCBCR).
  webcamCanvas2 = document.createElement("canvas");
  webcamCanvas2.width = FACEvideo_WIDTH;
  webcamCanvas2.height = FACEvideo_HEIGHT;
  webcamCanvas2.className = "webcam-canvas";
  webcamCtx2 = webcamCanvas2.getContext("2d");
  document.getElementById("webcam-magic-box").appendChild(webcamCanvas2);

  // Create and configure the third canvas to use as WEBCAM (face swap).
  webcamCanvas3 = document.createElement("canvas");
  webcamCanvas3.width = 3 * FACEvideo_WIDTH;
  webcamCanvas3.height = 3 * FACEvideo_HEIGHT;
  webcamCanvas3.className = "webcam-faceswap-canvas";
  webcamCtx3 = webcamCanvas3.getContext("2d");
  document.getElementById("faceswap-box").appendChild(webcamCanvas3);

  // Create and configure the fourth canvas to use as WEBCAM (rabbit filter)
  webcamCanvas4 = document.createElement("canvas");
  webcamCanvas4.width = 3 * FACEvideo_WIDTH;
  webcamCanvas4.height = 3 * FACEvideo_HEIGHT;
  webcamCanvas4.className = "webcam-custom-pink";
  webcamCtx4 = webcamCanvas4.getContext("2d");
  document.getElementById("pinkCuteBox").appendChild(webcamCanvas4);

  // Initialize image loaders for RABBIT FILTER SECTION.
  hatLoader = new ImageLoader(RABBIT_MODES.MODE_1.ears);
  glassLoader = new ImageLoader(RABBIT_MODES.MODE_1.glasses);
  blushLoader = new ImageLoader(RABBIT_MODES.MODE_1.blush);
}

function draw() {
  faceDetector.startDetection(); // Start face detection process.
  faces = faceDetector.getFaces(); // Retrieve detected faces.
  keyboardControls.updateFaces(faces); // Update faces for keyboard controls.

  // Draw video frames on respective canvas elements.
  webcamCtx.drawImage(video.elt, 0, 0, webcamCanvas.width, webcamCanvas.height);
  webcamCtx2.drawImage(
    video.elt,
    0,
    0,
    webcamCanvas2.width,
    webcamCanvas2.height
  );
  webcamCtx3.drawImage(
    video.elt,
    0,
    0,
    webcamCanvas3.width,
    webcamCanvas3.height
  );

  webcamCtx4.drawImage(
    video.elt,
    0,
    0,
    webcamCanvas4.width,
    webcamCanvas4.height
  );

  for (let i = 0; i < faces.length; i++) {
    const face = faces[i];
    drawFilteredFace(face, currentEffect, webcamCtx3);
    drawCuteFilter(face, webcamCtx4, hatLoader, glassLoader, blushLoader);
  }
}

/////////////////////////////////////////////////////////////////////////
// FUNCTIONS FOR FACESWAP SECTION
/////////////////////////////////////////////////////////////////////////

/**
 * @function applyFilterToFace
 * @description Applies a specified image processing effect to a given face image. The function sets the
 * image in both the CONVERTER and PROCESSOR, and then applies the specified effect using the appropriate
 * handler function. If the effect is not defined in the effectHandlers, an error is logged.
 *
 * @param {Image} face - The face image to which the effect will be applied.
 * @param {string} effect - The name of the effect to apply. This should match one of the keys in the
 * effectHandlers object. The effect determines which image processing function is called.
 *
 * @returns {Image|undefined} The processed image if the effect is defined; otherwise, logs an error
 * and returns undefined.
 *
 * @throws {TypeError} Throws a TypeError if `face` is not an instance of Image or `effect` is not a valid
 * key in effectHandlers.
 *
 * @example
 * Example usage with a face image and a 'blur' effect
 * const processedImage = applyFilterToFace(myFaceImage, 'blur');
 * The variable processedImage now contains the face image with the blur effect applied
 */
const applyFilterToFace = (_face, _effect) => {
  if (typeof _effect !== "string" || !effectHandlers.hasOwnProperty(_effect)) {
    throw new TypeError(
      'The parameter "effect" must be a valid key in effectHandlers.'
    );
  }

  CONVERTERFace.setImage(_face);
  TINTFace.setImage(_face);

  const effectFunction = effectHandlers[_effect];
  if (effectFunction) {
    return effectFunction(_face);
  } else {
    console.error(`Effect "${_effect}" is not defined.`);
    return;
  }
};

/**
 * Draws a filtered face on the canvas.
 * @function drawFilteredFace
 * @param {Object} face - The detected face object.
 * @param {string} effect - The image processing effect to apply.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
function drawFilteredFace(face, effect, ctx) {
  const [faceImage, faceCoords] = faceDetector.getFaceRegion(face);
  if (effect === "none") {
    console.error("Could not extract face region.");
    return;
  }

  const processedFace = applyFilterToFace(faceImage, effect);
  if (!(processedFace instanceof p5.Image)) {
    console.error("Processed face is not a p5.Image instance.");
    return;
  }

  ctx.drawImage(
    processedFace.canvas,
    faceCoords.x,
    faceCoords.y,
    faceCoords.w,
    faceCoords.h
  );
}

/////////////////////////////////////////////////////////////////////////
// FUNCTIONS FOR RABBIT FILTER SECTION
/////////////////////////////////////////////////////////////////////////
/**
 * Applies a cute filter to a detected face using the provided context and image loaders.
 *
 * @param {Object} face - The detected face object
 * @param {CanvasRenderingContext2D} webcamCtx4 -
 * The 2D rendering context (webcam canvas).
 * @param {ImageLoader} hatImageLoader - ImageLoader instance for the hat image.
 * @param {ImageLoader} glassLoader -ImageLoader instance for the glasses image.
 * @param {ImageLoader} blushLoader -ImageLoader instance for the blush image.
 */
function drawCuteFilter(
  face,
  webcamCtx4,
  hatImageLoader,
  glassLoader,
  blushLoader
) {
  const cuteFilter = new CuteFilter(
    webcamCtx4,
    hatImageLoader,
    glassLoader,
    blushLoader
  );

  cuteFilter.apply(face);
}
