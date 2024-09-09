/**
 * @file flat-slider.js
 * @description This script defines a FlatSlider class that dynamically creates
 *              and appends a flat slider to a specified container. The slider
 *              is customizable with options for range, steps and initial value
 */

class FlatSlider {
  /**
   * Creates an instance of the FlatSlider class.
   * @param {string} containerId - The ID of the container where the slider will be appended.
   * @param {number} initialValue - The initial value of the slider.
   * @param {number} steps - The number of steps in the slider.
   * @param {number} min - The minimum value of the slider range.
   * @param {number} max - The maximum value of the slider range.
   */
  constructor(
    containerId,
    initialValue,
    steps,
    min,
    max,
    containerClass,
    inputClass,
    labelClass
  ) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with ID ${containerId} not found.`);
      return;
    }

    this.initialValue = initialValue;
    this.steps = steps;
    this.min = min;
    this.max = max;

    this.containerClass = containerClass;
    this.inputClass = inputClass;
    this.labelClass = labelClass;

    this.sliderInput = null;
    this.sliderLabel = null;
    this.isMoving = false;

    this._createSliderContainer();
    this._createSliderInput();
    this._createSliderLabel();
    this._appendSliderElements();
    this._addInputEventListener();
  }

  /**
   * Creates the slider container element.
   */
  _createSliderContainer() {
    this.sliderContainer = document.createElement("div");
    this.sliderContainer.className = this.containerClass;
  }

  /**
   * Creates the slider input element.
   */
  _createSliderInput() {
    this.sliderInput = document.createElement("input");
    this.sliderInput.type = "range";
    this.sliderInput.className = this.inputClass;
    this.sliderInput.min = this.min;
    this.sliderInput.max = this.max;
    this.sliderInput.step = (this.max - this.min) / this.steps;
    this.sliderInput.value = this.initialValue;
  }

  /**
   * Creates the label element to display the slider's current value.
   */
  _createSliderLabel() {
    this.sliderLabel = document.createElement("div");
    this.sliderLabel.className = this.labelClass;
    this.sliderLabel.textContent = this.initialValue;
  }

  /**
   * Appends the slider input and label elements to the slider container.
   */
  _appendSliderElements() {
    this.sliderContainer.appendChild(this.sliderInput);
    this.sliderContainer.appendChild(this.sliderLabel);
    this.container.appendChild(this.sliderContainer);
  }

  /**
   * Adds an event listener to the slider input to update the label on value change.
   */
  _addInputEventListener() {
    this.sliderInput.addEventListener("input", () => {
      this.sliderLabel.textContent = this.sliderInput.value;
      this.isMoving = true;
    });
    this.sliderInput.addEventListener("mouseup", () => (this.isMoving = false));
  }

  reset() {
    this.sliderInput.value = this.initialValue;
    this.sliderLabel.textContent = this.initialValue;
  }

  /**
   * Sets the value of the slider to the specified value.
   * @param {number} value - The value to set the slider to.
   */
  setValue(value) {
    this.sliderInput.value = value;
    this.sliderLabel.textContent = value;
  }

  /**
   * Returns the current value of the slider.
   * @returns {number} The current value of the slider.
   */
  getValue() {
    return parseInt(this.sliderInput.value);
  }
}
/**
 * Manages multiple FlatSlider instances based on a provided configuration.
 */
class FlatSliderManager {
  /**
   * Initializes the FlatSliderManager with the given slider configuration.
   * Creates FlatSlider instances for each configuration entry.
   *
   * @param {Object} sliderConfig - Configuration object for sliders.
   * @param {Object} sliderConfig[space] - Configuration for a specific slider.
   * @param {string} sliderConfig[space].containerID - The ID of the container element for the slider.
   * @param {number} sliderConfig[space].initialValue - The initial value of the slider.
   * @param {number} sliderConfig[space].step - The step value for the slider.
   * @param {number} sliderConfig[space].min - The minimum value for the slider.
   * @param {number} sliderConfig[space].max - The maximum value for the slider.
   * @param {string} sliderConfig[space].className - The CSS class name for the slider.
   * @param {string} sliderConfig[space].inputClass - The CSS class name for the slider input element.
   * @param {string} sliderConfig[space].labelClass - The CSS class name for the slider label element.
   */
  constructor(sliderConfig) {
    /**
     * @type {Object.<string, FlatSlider>}
     * @private
     */
    this.sliders = {};

    // Iterate over each slider configuration and create FlatSlider instances
    Object.keys(sliderConfig).forEach((space) => {
      const {
        containerID,
        initialValue,
        step,
        min,
        max,
        className,
        inputClass,
        labelClass,
      } = sliderConfig[space].slider;

      this.sliders[space] = new FlatSlider(
        containerID,
        initialValue,
        step,
        min,
        max,
        className,
        inputClass,
        labelClass
      );
    });
  }

  /**
   * Resets all sliders to their initial values.
   */
  resetAll() {
    Object.values(this.sliders).forEach((slider) => slider.reset());
  }

  /**
   * Registers event listeners for all sliders.
   * Calls the provided callback function when a slider value changes.
   *
   * @param {Function} callback - The function to call when a slider value changes.
   * @param {string} callback.space - The identifier of the slider that triggered the event.
   */
  registerEvents(callback) {
    Object.keys(this.sliders).forEach((space) => {
      const slider = this.sliders[space];

      slider.sliderInput.addEventListener("input", () => {
        callback(space);
      });
    });
  }
}
