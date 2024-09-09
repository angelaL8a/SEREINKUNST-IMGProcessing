/**
 * @fileoverview
 * This file contains the `KeyboardControls` class used to manage keyboard interactions
 * for applying various image effects based on user input. The class listens for keydown
 * events and maps them to predefined image processing effects, updating the current
 * effect used in the application.
 */

/**
 * @class
 * @classdesc The `KeyboardControls` class handles keyboard interactions to apply
 * image effects based on user input. It maps specific key presses to predefined effects
 * and updates the current effect being applied to detected faces.
 *
 * This class listens for keydown events and maps keys to effects using the provided
 * `filterNames` object. When a key corresponding to an effect is pressed, it updates
 * the effect applied to the images of detected faces.
 */
class KeyboardControls {
  /**
   * Creates an instance of `KeyboardControls`.
   * @param {Array} faces - An array of face objects to be processed. Each face object
   *                        represents a detected face in the image.
   * @param {Object} filterNames - An object mapping key codes (as strings) to effect names.
   *                                This is used to determine which effect to apply based
   *                                on the key pressed.
   * @param {Function} currentEffectSetter - A function to set the current effect to be applied.
   *                                         This function should accept a single argument
   *                                         representing the effect name.
   */
  constructor(faces, filterNames, currentEffectSetter) {
    this.faces = faces;
    this.setCurrentEffect = currentEffectSetter;

    // Create a map of key codes to effect names
    this.effectMap = new Map(
      Object.entries(filterNames).map(([key, value]) => [key, value])
    );
  }

  /**
   * Updates the list of faces to be processed.
   * @param {Array} faces - An array of updated face objects.
   */
  updateFaces(faces) {
    this.faces = faces;
  }

  /**
   * Handles key press events and updates the current effect based on the pressed key.
   * Only processes the event if there are faces detected.
   * @param {KeyboardEvent} event - The keydown event object.
   */
  handleKeyPress(event) {
    if (this.faces.length === 0) return;

    // Get the effect corresponding to the pressed key
    const effect = this.effectMap.get(event.key);
    if (effect) {
      this.setCurrentEffect(effect);
    }
  }

  /**
   * Registers the keydown event listener for handling keyboard input.
   * Binds the event handler to the class instance.
   */
  registerEventListener() {
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }
}
