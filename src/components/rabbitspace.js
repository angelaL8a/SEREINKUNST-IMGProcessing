/**
 * This script is responsible for implementing the buttons for the Rabbit Filter
 * section. It dynamically creates SVG icons and buttons based on predefined
 * filter configurations.
 */

/**
 * An object containing filter configurations for the Rabbit Filter section.
 * Each filter has an id, icon, and SVG elements (circles and paths) to be rendered.
 *
 * @type {Object.<string, {id: string, icon: string, circles?:
 * Array.<{cx: number, cy: number, r: number}>, paths?: string[]}>}
 */
const filters = {
  pinkCute1: {
    id: "pinkCute1",
    icon: "target",
    circles: [
      { cx: 12, cy: 12, r: 10 },
      { cx: 12, cy: 12, r: 6 },
      { cx: 12, cy: 12, r: 2 },
    ],
  },
  pinkCute2: {
    id: "pinkCute2",
    icon: "rainbow",
    paths: [
      "M22 17a10 10 0 0 0-20 0",
      "M6 17a6 6 0 0 1 12 0",
      "M10 17a2 2 0 0 1 4 0",
    ],
  },
  pinkCute3: {
    id: "pinkCute3",
    icon: "flower",
    circles: [{ cx: 12, cy: 12, r: 3 }],
    paths: [
      "M12 16.5A4.5 4.5 0 1 1 7.5 12 A4.5 4.5 0 1 1 12 7.5 A4.5 4.5 0 1 1 16.5 12 A4.5 4.5 0 1 1 12 16.5",
      "M12 7.5V9",
      "M7.5 12H9",
      "M16.5 12H15",
      "M12 16.5V15",
      "M8 8L9.88 9.88",
      "M14.12 9.88L16 8",
      "M8 16L9.88 14.12",
      "M14.12 14.12L16 16",
    ],
  },
};

/**
 * Creates an SVG element with the specified icon, circles, and paths.
 *
 * @param {string} icon - The icon name to be used as a class for the SVG element.
 * @param {Array.<{cx: number, cy: number, r: number}>} [circles=[]] - An array of circle configurations.
 * @param {string[]} [paths=[]] - An array of path data strings.
 * @returns {SVGElement} The created SVG element.
 */
function createSVG(icon, circles = [], paths = []) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "#ffc6c6");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.classList.add(`lucide`, `lucide-${icon}`);

  circles.forEach(({ cx, cy, r }) => {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    svg.appendChild(circle);
  });

  paths.forEach((pathData) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    svg.appendChild(path);
  });

  return svg;
}

/**
 * Generates buttons for each filter in the Rabbit Filter section.
 * Each button contains an SVG icon based on the filter configuration.
 */
function generateButtons() {
  const selectorContainer = document.getElementById("pinkCuteSelector");

  Object.values(filters).forEach((filter) => {
    const button = document.createElement("button");
    button.classList.add("pinkCuteButton");
    button.id = filter.id;

    button.addEventListener("click", function () {
      const mode = button.id.replace("pinkCute", "MODE_");
      if (RABBIT_MODES[mode]) {
        handleRabbitModeChange(mode);
      }
    });

    const svgIcon = createSVG(filter.icon, filter.circles, filter.paths);
    button.appendChild(svgIcon);

    selectorContainer.appendChild(button);
  });
}

// Call the function to generate the buttons when the script is loaded
generateButtons();
