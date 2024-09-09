/**
 * Creates a list of navigation items.
 * @param {Array<Object>} items - Array of objects with the structure
 * { text?: string, href: string, imgSrc?: string, imgAlt?: string }
 * - If `imgSrc` is provided, it will be used as an image in place of `text`.
 * @returns {HTMLUListElement} - <ul> element containing navigation items.
 */
function createNavList(items) {
  const ul = document.createElement("ul");
  ul.className = "nav-list";

  items.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;

    if (item.imgSrc) {
      // If imgSrc is provided, create an image element
      const img = document.createElement("img");
      img.src = item.imgSrc;
      img.alt = item.imgAlt || "Navigation image"; // Fallback alt text
      img.className = "nav-image"; // Optional: Add a class for styling images
      a.appendChild(img);
    } else if (item.text) {
      // If no image is provided, use the text
      a.textContent = item.text;
    }

    li.appendChild(a);
    ul.appendChild(li);
  });

  return ul;
}

/**
 * Creates the navigation bar component and inserts it into the header element.
 * @param {Array<Object>} items - Array of objects with the structure
 * { text?: string, href: string, imgSrc?: string, imgAlt?: string }
 */
function createNavbar(items) {
  const header = document.querySelector(".navbar");
  if (!header) {
    console.error("Element .navbar not found");
    return;
  }

  const nav = document.createElement("nav");
  nav.appendChild(createNavList(items));
  header.appendChild(nav);
}

// Define the navigation items with both text and images
const navItems = [
  {
    imgSrc: "assets/landing/LOGO.png", // Path to the image for the first item
    imgAlt: "Serein Logo",
    href: "#serein",
  },
  { text: "Grayscale & Bright Boost", href: "#grayscale-bright" },
  { text: "RGB Channels", href: "#rgb-channels" },
  { text: "Threshold", href: "#threshold" },
  { text: "ColorSpace Fun", href: "#colorspace-fun" },
  { text: "Cute Rabbit", href: "#rabbit-space" },
  { text: "FaceSwap", href: "#faceswap" },
];

createNavbar(navItems);
