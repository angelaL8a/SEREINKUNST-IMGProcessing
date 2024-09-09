/**
 * Creates and appends multiple oval div elements to a container.
 * @param {string} containerSelector - The CSS selector for the container element.
 * @param {number} numberOfOvals - The number of oval divs to create.
 */
function createOvals(containerSelector, numberOfOvals) {
  // Select the container element
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container with selector "${containerSelector}" not found`);
    return;
  }
  // Create and append the oval divs
  for (let i = 1; i <= numberOfOvals; i++) {
    const oval = document.createElement("div");
    oval.className = `oval oval-${i}`;
    container.appendChild(oval);
  }
}

/**
 * Creates and appends title and image elements to the hero content container.
 * @param {string} containerSelector - The CSS selector for the hero content container.
 * @param {Array<Object>} titles - Array of objects with the structure { class: string, content: string } for titles.
 * @param {Array<Object>} images - Array of objects with the structure { src: string, alt: string, class: string } for images.
 */
function createHeroContent(containerSelector, titles, images) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container with selector "${containerSelector}" not found`);
    return;
  }

  // Create and append the hero title container
  const titleContainer = document.createElement("div");
  titleContainer.className = "hero-title-container";

  titles.forEach((title) => {
    const titleElement = document.createElement("h1");
    titleElement.className = title.class;
    titleElement.textContent = title.content;
    titleContainer.appendChild(titleElement);
  });
  container.appendChild(titleContainer);

  // Create and append the hero images container
  const imagesContainer = document.createElement("div");
  imagesContainer.className = "hero-images-container";

  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    imgElement.className = image.class;
    imagesContainer.appendChild(imgElement);
  });
  container.appendChild(imagesContainer);
}

/**
 * Creates and appends the SVG and text content to the hero message container.
 * @param {string} containerSelector - The CSS selector for the hero message container.
 * @param {string} svgContent - The SVG markup as a string.
 * @param {string} messageText - The text content to be added.
 */
function createHeroMessage(containerSelector, svgContent, messageText) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container with selector "${containerSelector}" not found`);
    return;
  }

  // Create and append the SVG element
  const svgContainer = document.createElement("div");
  svgContainer.innerHTML = svgContent;
  svgContainer.className = "hero-svg-container";
  container.appendChild(svgContainer);

  // Create and append the message text
  const messageContainer = document.createElement("div");
  messageContainer.className = "hero-message-text";
  messageContainer.textContent = messageText;
  container.appendChild(messageContainer);
}

// CREATE HERO CONTENT

const titles = [
  { class: "hero-title-stroke", content: "Cherish Art" },
  { class: "hero-title-fill", content: "Discover Vibrance" },
];

const images = [
  {
    src: "assets/landing/landingDemo1.png",
    alt: "Landing Demo 1",
    class: "hero-image-1",
  },
  {
    src: "assets/landing/landingDemo2.png",
    alt: ":Landing Demo 2",
    class: "hero-image-2",
  },
];

const svgMarkup = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="438.99"
    height="914.07"
    viewBox="0 0 929 412"
    fill="none"
    class="hero-oval-svg"
  >
    <path
      d="M736 389C499.905 430.395 38.361 419.356 5.99993 306.5C-26.3611 193.644 97.7209 57.7131 333.816 16.3176C569.912 -25.0779 839.412 14.686 907 151C939.361 263.856 966.472 335.594 736 389Z"
      fill="#F7ECFF"
    />
  </svg>
`;

const messageText = `
  Unleash your creativity with our colorful filters, magical face swaps, and more. Transform your moments into vibrant memories. Make it part of your daily fun!
`;

createOvals(".hero-background", 5);
createHeroContent(".hero-content", titles, images);
createHeroMessage(".hero-message", svgMarkup, messageText);
