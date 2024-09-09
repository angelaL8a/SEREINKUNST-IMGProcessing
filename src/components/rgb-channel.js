/**
 * @file rgbChannelManager.js
 *
 * @description
 * This module handles the creation and initialization of RGB channel elements on
 * the webpage. It generates the necessary HTML elements for displaying RGB channels,
 * including red, green, and blue. This is achieved by leveraging a configuration
 * object to map each channel's properties and utilizing functions to dynamically
 * create and append the elements to the DOM.
 *
 * @constants
 * - `RGB_CHANNELS_CONFIG`: An object defining the configuration for each RGB channel,
 * including the title, container ID, and class for styling.
 *
 * @dependencies
 * - This module depends on the presence of a DOM element with ID `channel-container`.
 *
 */

const RGB_CHANNELS_CONFIG = {
  red: {
    title: "Red",
    container: "red-channel-box",
    box: "red-channel",
  },
  green: {
    title: "Green",
    container: "green-channel-box",
    box: "green-channel",
  },
  blue: {
    title: "Blue",
    container: "blue-channel-box",
    box: "blue-channel",
  },
};

/**
 * @function createChannelElement
 * @description
 * Creates an HTML element for a given RGB channel based on the provided configuration.
 *
 * @param {Object} channel - The configuration object for the RGB channel.
 * @param {string} channel.title - The title of the channel.
 * @param {string} channel.container - The ID of the container element for the channel.
 * @param {string} channel.box - The class of the channel box.
 *
 * @returns {HTMLElement} - The newly created channel element.
 */
function createChannelElement(channel) {
  if (!channel) return; // Skip if channel is not found

  // Create a container div for the channel
  const channelDiv = document.createElement("div");
  channelDiv.classList.add("rgb-channel");

  // Create and set the title element
  const title = document.createElement("h3");
  title.classList.add("channel-title");
  title.textContent = channel.title;

  // Create and set the content element
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("channel-content", channel.title.toLowerCase());
  contentDiv.id = channel.container;
  contentDiv.innerHTML = "<p>Capture the fun! No image here yet.</p>";

  // Append title and content to the channel container
  channelDiv.appendChild(title);
  channelDiv.appendChild(contentDiv);

  return channelDiv;
}

/**
 * @function initializeChannels
 * @description
 * Initializes and appends RGB channel elements to the DOM by iterating over
 * the configuration object.
 */
function initializeChannels() {
  const container = document.getElementById("channel-container");
  if (!container) {
    console.error(
      "The channel container element with ID 'channel-container' was not found."
    );
    return;
  }

  // Create and append each channel element
  Object.keys(RGB_CHANNELS_CONFIG).forEach((key) => {
    container.appendChild(createChannelElement(RGB_CHANNELS_CONFIG[key]));
  });
}

// Call this function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeChannels);
