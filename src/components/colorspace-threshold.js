// Create a dictionary to hold the slider configurations and containers for each color space
const colorSpacesThreshold = {
  CMYK: {
    label: "CMYK Threshold",
    id: "CMYK",
    initialText: "Capture the moment and let the fun unfold!",
  },
  YCbCr: {
    label: "YCbCr Threshold",
    id: "YCbCr",
    initialText: "Capture the moment and let the fun unfold!",
  },
  HSV: {
    label: "HSV Threshold",
    id: "HSV",
    initialText: "Capture the moment and let the fun unfold!",
  },
  LAB: {
    label: "Lab Threshold",
    id: "LAB",
    initialText: "Capture the moment and let the fun unfold!",
  },
};

// Function to create the threshold box and slider dynamically
function createColorSpaceBox({ label, id, initialText }) {
  // Create main container div
  const containerDiv = document.createElement("div");
  containerDiv.className = "colorspace-threshold-box-container";

  // Create label
  const h4 = document.createElement("h4");
  h4.textContent = label;

  // Create the box container
  const boxDiv = document.createElement("div");
  boxDiv.className = "colorspace-threshold-box";

  // Create the threshold box where the color space will be displayed
  const thresholdBox = document.createElement("div");
  thresholdBox.className = `${id}-box-threshold`;
  thresholdBox.id = `${id}-box-threshold`;

  // Create initial text inside the threshold box
  const initialTextP = document.createElement("p");
  initialTextP.style.color = "#82b1cc";
  initialTextP.style.fontSize = "20px";
  initialTextP.style.padding = "70px";
  initialTextP.textContent = initialText;
  thresholdBox.appendChild(initialTextP);

  boxDiv.appendChild(thresholdBox);

  // Create slider container
  const sliderContainer = document.createElement("div");
  sliderContainer.className = "slider-colorspace";
  sliderContainer.id = `slider-colorspace-${id}`;

  // Append elements to main container
  containerDiv.appendChild(h4);
  containerDiv.appendChild(boxDiv);
  containerDiv.appendChild(sliderContainer);

  return containerDiv;
}

// Function to initialize and render all color spaces dynamically
function initializeColorSpaces() {
  const mainContainer = document.getElementById("colorspace-threshold"); // General container

  let thresholdContainer; // Temporary container to hold two boxes at a time

  // Loop through each color space and create a new threshold container every two items
  Object.keys(colorSpacesThreshold).forEach((space, index) => {
    const colorSpaceConfig = colorSpacesThreshold[space];
    const colorSpaceBox = createColorSpaceBox(colorSpaceConfig);

    // Create a new container for every pair of color spaces
    if (index % 2 === 0) {
      thresholdContainer = document.createElement("div");
      thresholdContainer.className = "colorspace-threshold-container";
      mainContainer.appendChild(thresholdContainer);
    }

    // Append the current color space box to the current threshold container
    thresholdContainer.appendChild(colorSpaceBox);
  });
}

// Initialize
initializeColorSpaces();
