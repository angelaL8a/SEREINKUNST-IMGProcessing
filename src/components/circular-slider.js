/**
 * circular-slider.js
 *
 * This script defines and manages circular sliders that allow users to adjust
 * threshold values for image processing filters. Each circular slider is associated
 *  with a specific color channel (red, green, or blue) and allows users to
 * interactively modify the threshold values. The sliders visually represent the user's
 * input by rotating a knob along a circular track.
 *
 * The main functionalities include:
 * - Dynamically creating and appending circular sliders to the DOM.
 * - Handling user interactions to rotate the slider knob.
 * - Converting the knob's rotation angle into a threshold value.
 * - Updating associated image processing parameters in real time based on user input.
 */

/**
 * CircularSlider class
 *
 * This class encapsulates the functionality of a circular slider, including its
 * initialization, user interaction handling, and conversion of knob rotation into
 * a percentage value.
 */
class CircularSlider {
  /**
   * Constructor to initialize the CircularSlider instance.
   *
   * @param {string} knobSelector - CSS selector for the slider knob element.
   * @param {string} pointerSelector - CSS selector for the pointer inside the knob.
   * @param {string} progressSelector - ID of the SVG circle element representing the progress indicator.
   * @param {number} [defaultValue=128] - Default threshold value for the slider (0-255 range).
   */
  constructor(
    knobSelector,
    pointerSelector,
    progressSelector,
    defaultValue = 128
  ) {
    this.knob = document.querySelector(knobSelector);
    this.pointer = document.querySelector(pointerSelector);
    this.progressCircle = document.getElementById(progressSelector);
    this.isRotating = false;
    this.progressPercent = 0;
    // Calculate the initial rotation based on the default value and update the slider
    const initialRotation = (defaultValue / 255) * 270;
    this._updateRotation(initialRotation);
    // Initialize event listeners for user interaction
    this._initEventListeners(knobSelector);
  }

  /**
   * Initializes event listeners for mouse events on the slider knob.
   *
   * @param {string} knob - CSS selector for the slider knob element.
   */
  _initEventListeners(knob) {
    document.addEventListener("mousedown", (e) => {
      if (e.target.closest(knob)) {
        this.isRotating = true;
      }
    });

    document.addEventListener("mousemove", (e) => this._rotateKnob(e));
    document.addEventListener("mouseup", () => (this.isRotating = false));
  }

  /**
   * Handles the rotation of the knob based on the user's mouse movement.
   *
   * @param {MouseEvent} e - The mouse event triggered by user interaction.
   */
  _rotateKnob(e) {
    if (this.isRotating) {
      const knobCenter = this._getKnobCenter();
      const angleDeg = this._calculateRotationAngle(
        e.clientX,
        e.clientY,
        knobCenter
      );

      const rotationAngle = (angleDeg - 135 + 360) % 360;
      if (rotationAngle <= 270) {
        this._updateRotation(rotationAngle);
      }
    }
  }

  /**
   * Calculates the center coordinates of the knob element.
   *
   * @returns {Object} - An object containing the x and y coordinates of the knob center.
   */
  _getKnobCenter() {
    const rect = this.knob.getBoundingClientRect();
    return {
      x: rect.left + this.knob.clientWidth / 2,
      y: rect.top + this.knob.clientHeight / 2,
    };
  }

  /**
   * Calculates the angle of rotation based on the mouse position relative to the knob center.
   *
   * @param {number} clientX - The x-coordinate of the mouse pointer.
   * @param {number} clientY - The y-coordinate of the mouse pointer.
   * @param {Object} knobCenter - The center coordinates of the knob.
   * @returns {number} - The angle of rotation in degrees.
   */
  _calculateRotationAngle(clientX, clientY, knobCenter) {
    const deltaX = clientX - knobCenter.x;
    const deltaY = clientY - knobCenter.y;
    const angleRad = Math.atan2(deltaY, deltaX);
    return (angleRad * 180) / Math.PI;
  }

  /**
   * Updates the rotation of the knob and the corresponding progress indicator.
   *
   * @param {number} rotationAngle - The angle of rotation in degrees.
   */
  _updateRotation(rotationAngle) {
    this.progressPercent = rotationAngle / 270;
    this.pointer.style.transform = `rotate(${rotationAngle - 45}deg)`;
    this.progressCircle.style.strokeDashoffset = `${
      880 - 660 * this.progressPercent
    }`;
  }

  /**
   * Sets the value of the slider based on the provided default value.
   * The default value should be in the range of 0-255.
   * The knob rotation is updated accordingly.
   * @param {number} defaultValue - The default threshold value for the slider.
   * */
  setValue(defaultValue) {
    const initialRotation = (defaultValue / 255) * 270;
    this._updateRotation(initialRotation);
  }

  /**
   * Retrieves the current value of the slider as an integer (0-255 range).
   *
   * @returns {number} - The current slider value.
   */
  getValue() {
    return Math.round(this.progressPercent * 255);
  }
}

/**
 * @class CircularSliderManager
 * @description Manages the creation and behavior of circular sliders for different
 * color channels. This class renders the sliders dynamically, initializes their
 * configurations, and handles the events triggered when a user interacts with the
 * sliders. Each slider controls the threshold for a specific color channel
 * (red, green, blue).
 */
class CircularSliderManager {
  /**
   * @constructor
   * @param {Object} sliderConfig - Configuration object that defines selectors,
   * initial values, and other properties for each slider.
   * @param {Array} colors - An array of color names (e.g., ['red', 'green', 'blue'])
   * that represent the different channels.
   * @param {HTMLElement} container - The DOM element where the sliders will be rendered.
   */
  constructor(sliderConfig, colors, container) {
    // Render sliders into the provided container based on the specified colors.
    this.renderSliders(container, colors);
    this.sliders = {};

    // Initialize each slider using the provided configuration.
    Object.keys(sliderConfig).forEach((space) => {
      const { knobSelector, pointerSelector, progressSelector, initialValue } =
        sliderConfig[space].slider;

      // Create a new CircularSlider instance for each color space.
      this.sliders[space] = new CircularSlider(
        knobSelector,
        pointerSelector,
        progressSelector,
        initialValue
      );
    });
  }

  /**
   * @method renderSliders
   * @description Clears the container and renders the circular sliders for each color
   * This function dynamically injects HTML for each circular slider into the DOM.
   * @param {HTMLElement} container - The DOM element, sliders will be appended here.
   * @param {Array} _colors - An array of colors (different channels)
   */
  renderSliders(container, _colors) {
    if (!container) return;
    container.innerHTML = ""; // Clear the container before rendering.
    const colors = _colors;
    colors.forEach((color) => {
      container.innerHTML += this.createCircularSlider(color);
    });
  }

  /**
   * @method createCircularSlider
   * @description Generates the HTML structure for a single circular slider, which
   * includes a knob, pointer, and progress bar. Each slider is color-coded based
   * on the channel (red, green, blue) it controls.
   * @param {string} color - The color representing the channel for this slider
   * @returns {string} HTML string representing the circular slider structure.
   */
  createCircularSlider(color) {
    return `
        <div class="threshold-oval">
            <div class="circular-slider-container-${color}">
                <div class="circular-slider-${color}">
                    <div class="circular-knob-${color}">
                        <div class="circular-pointer-${color}">
                            <span class="material-icons">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 19V5L19 12L8 19Z" fill="#9B9B9B" />
                                </svg>
                            </span>
                        </div>
                        <div class="threshold-oval-filter-container" id="threshold-oval-${color}"></div>
                    </div>
                    <svg class="circular-progress-bar-${color}" width="300" height="300">
                        <circle class="circular-progress-background-${color}" cx="150" cy="150" r="140"></circle>
                        <circle id="circular-progress-${color}" class="circular-progress-indicator-${color}" cx="150" cy="150" r="140" style="stroke: url(#gradient); stroke-width: 16px; stroke-linecap: round;"></circle>
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color: #c2fde8" />
                                <stop offset="50%" style="stop-color: #dfc4f5" />
                                <stop offset="100%" style="stop-color: #e8d2f8" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>`;
  }

  /**
   * @method registerEvents
   * @description Registers mouse move events for each slider, allowing real-time
   * updates to the image processing as the user interacts with the circular sliders.
   * The event fires whenever the knob is moved, and it calls a callback with the
   * updated space, value, and channel index.
   * @param {function} callback - A callback function that receives the slider space
   *  (e.g., 'RED_THRESHOLD'), the updated slider value, and the color channel index
   *  (0 for red, 1 for green, 2 for blue).
   */
  registerEvents(callback) {
    Object.keys(this.sliders).forEach((space) => {
      const slider = this.sliders[space];
      const channel = this.getChannel(space);
      // Add event listener for mouse move,updates the slider's value when rotating.
      document.addEventListener("mousemove", (e) => {
        if (slider.isRotating) {
          callback(space, slider.getValue(), channel);
        }
      });
    });
  }

  /**
   * @method getChannel
   * @description Maps the slider space name (e.g., 'RED_THRESHOLD') to its corresponding color channel index.
   * @param {string} space - The space or slider name
   * @returns {number} The index of the color channel
   */
  getChannel(space) {
    if (space === "RED_THRESHOLD") return 0;
    if (space === "GREEN_THRESHOLD") return 1;
    if (space === "BLUE_THRESHOLD") return 2;
  }

  /**
   * @method getSlider
   * @description Retrieves a specific CircularSlider instance by its space name.
   * @param {string} space - The space or slider name
   * (e.g., 'RED_THRESHOLD', 'GREEN_THRESHOLD', 'BLUE_THRESHOLD').
   * @returns {CircularSlider} The CircularSlider instance associated with the provided space name.
   */
  getSlider(space) {
    return this.sliders[space];
  }
}
