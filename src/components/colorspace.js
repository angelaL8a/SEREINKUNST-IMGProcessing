const colorSpaces = {
  HSV: {
    name: "HSV",
    description:
      "Dive into the spectrum of imagination with our HSV filters—where hues, saturation, and vibrance converge to redefine your visual experience.",
    textColor: "#e8d5ff",
    backgroundColor: "purple",
  },
  LAB: {
    name: "LAB",
    description:
      "Explore the essence of color with our Lab filters—where lightness and chromaticity harmonize to unveil true-to-life brilliance.",
    textColor: "#c2f4e5",
    backgroundColor: "green",
  },
  CMYK: {
    name: "CMYK",
    description:
      "Unlock the essence of print with our CMYK filters—where cyan, magenta, yellow, and black intertwine to bring a new dimension of color precision and depth to your visuals.",
    textColor: "#e8d5ff",
    backgroundColor: "purple",
  },
  YCbCr: {
    name: "YCbCr",
    description:
      "Explore the world with our YCbCr filters—where luminance and chrominance harmonize to deliver enhanced clarity and color separation for a striking visual experience.",
    textColor: "#c2f4e5",
    backgroundColor: "green",
  },
};

// Función que genera los espacios de color dinámicamente
function generateColorSpaces(containerId) {
  const container = document.getElementById(containerId);

  Object.keys(colorSpaces).forEach((space, index) => {
    const colorSpaceData = colorSpaces[space];
    const colorBox = createColorSpaceBox(space, colorSpaceData, index);
    container.appendChild(colorBox);
  });
}

// Función que crea el bloque de cada espacio de color
function createColorSpaceBox(space, data, index) {
  const colorSpaceDiv = document.createElement("div");
  colorSpaceDiv.classList.add(
    "colorspace",
    index % 2 === 0 ? "colorspace1" : "colorspace2"
  );

  const textDiv = createTextDiv(data);
  const camDiv = createCamDiv(space, data.backgroundColor);

  const appendElements = (index, colorSpaceDiv, textDiv, camDiv) => {
    const [first, second] =
      index % 2 === 0 ? [textDiv, camDiv] : [camDiv, textDiv];
    colorSpaceDiv.append(first, second);
  };

  appendElements(index, colorSpaceDiv, textDiv, camDiv);

  return colorSpaceDiv;
}

// Función que crea el bloque de texto de cada espacio de color
function createTextDiv(data) {
  const textDiv = document.createElement("div");
  textDiv.classList.add("colorspace-text", data.backgroundColor);
  textDiv.innerHTML = `
    <h3 style="color: ${data.textColor}">${data.name}</h3>
    <p>${data.description}</p>
  `;
  return textDiv;
}

// Función que crea el bloque de la cámara (camDiv)
function createCamDiv(space, backgroundColor) {
  const camDiv = document.createElement("div");
  camDiv.classList.add("colorspace-cam", "colorBox");

  const backBox = document.createElement("div");
  backBox.classList.add(
    `backBox${
      backgroundColor.charAt(0).toUpperCase() + backgroundColor.slice(1)
    }`
  );

  const colorBox = document.createElement("div");
  colorBox.classList.add(`${space}-box`);
  colorBox.id = `${space}-box`;

  const instructions = document.createElement("p");
  instructions.textContent = "Strike a pose and let the magic begin!";
  instructions.style = `color: ${
    backgroundColor === "purple" ? "#cfbddd" : "#93c7b4"
  }; font-size: 20px; padding: 20px`;

  colorBox.appendChild(instructions);
  camDiv.appendChild(backBox);
  camDiv.appendChild(colorBox);

  return camDiv;
}

generateColorSpaces("colorspace-content");
