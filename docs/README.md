![Serein Kunst Cover](/assets/UI-Figma/cover.png)

# 🌸 **Serein Kunst** 🌸

**Revolutionizing Image Processing with Art and Precision**

![Serein Kunst Logo](/assets/landing/LOGO.png)

## 🖼️ **Overview**

**Serein Kunst** is a groundbreaking web application that pushes the boundaries of image processing and artistic expression. This innovative tool is tailored for both developers and digital artists, offering a sophisticated blend of real-time webcam integration, face recognition, and advanced color space manipulation. With its array of dynamic filters, from intricate RGB and CMYK adjustments to playful Rabbit filters and customizable FaceSwap effects, Serein Kunst transforms ordinary images into captivating visual experiences. Its modular architecture ensures seamless performance and scalability, while its user-friendly design invites creativity and exploration. Dive into a world where technology meets art, and let Serein Kunst inspire your next masterpiece! 🌟🎨

## 💡 **Features**

- 🎨 **Artistic Filters**: Apply vivid filters like Rabbit Cute stickers or dynamic RGB channel modifications to bring life to your images.
- 🎥 **Real-Time Processing**: Leverages real-time face detection and manipulation for interactive creativity.
- 🖥️ **Modular Design**: Each filter section (RGB, LAB, CMYK, FaceSwap) is designed to be fully customizable and extendable.
- 🧠 **ML5.js Integration**: Face detection powered by ML5.js ensures accurate facial landmark tracking for perfect sticker placement.

## 🚀 **Technologies**

- **Languages**:  
  ![HTML](https://img.shields.io/badge/HTML-5-orange?logo=html5)  
  ![CSS](https://img.shields.io/badge/CSS-3-blue?logo=css3)  
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)

- **Libraries**:

  - **ML5.js** for face detection
  - **p5.js** for real-time interaction

- **Development Tools**:  
  ![VSCode](https://img.shields.io/badge/VSCode-Editor-blue?logo=visualstudiocode)  
  ![GitHub](https://img.shields.io/badge/GitHub-Repo-black?logo=github)

## 🔧 **Core Structure**

The architecture of **Serein Kunst** is highly modular and reusable:

```
└── 📁IMG-PROCESSING-APP-ML5
    └── 📁assets - Contains static files
        └── 📁custom - Custom assets for filters or UI components
        └── 📁landing - Media files for the landing page
    └── 📁docs - Documentation files
    └── 📁libraries - JavaScript libraries
        └── p5.dom.js - p5.js DOM library
        └── p5.min.js - Main p5.js library
    └── 📁src - Core source code
        └── 📁components - Reusable DOM components
            └── circular-slider.js - UI for circular sliders
            └── colorspace-threshold.js - Colorspace threshold UI
            └── colorspace.js - Colorspace section UI
            └── flat-slider.js - UI for flat sliders
            └── hero.js - Hero section UI
            └── navbar.js - Navbar UI
            └── rabbitspace.js - Rabbit Filter UI
            └── rgb-channel.js - RGB Channel section UI
        └── 📁config - Configuration files and constants
            └── constants.js - Global constants
            └── keyboardControls.js - Keyboard controls management
        └── 📁events - Event handling
            └── events.js - Custom event listeners
        └── 📁utils - Utility and helper functions
            └── 📁processors - Image and DOM processing
                └── colorSpaceProcessor.js - Color space conversion logic
                └── imageProcessor.js - Image saving and loading
                └── tintSpaceProcessor.js - RGB channel processing
            └── colorConverter.js - Color format conversion utilities
            └── colorSpaceConversion.js - Color space conversion methods
            └── cuteFilters.js - Manages Rabbit Filter
            └── faceDetection.js - Face detection logic (ML5.js)
            └── imageEffects.js - Pixelation, blur effects
            └── imageProcessing.js - Grayscale, threshold, channel extraction
            └── webcam.js - Webcam management
        └── main.js - Entry point for the app
    └── 📁structure
        └── structure.md - Project structure documentation
    └── 📁styles
        └── styles.css - Central stylesheet
    └── index.html - Main HTML file
```

## 🎯 **Unique Selling Points**

- **Tailored Filters**: Unlike conventional image processing apps, Serein Kunst brings an artistic touch to each filter, focusing on creative expression with **Rabbit Filter** and **FaceSwap**.
- **Scalability & Flexibility**: Built with modular JavaScript components, the app can easily be extended with new filters and effects, making it future-proof.
- **High-Performance Processing**: The app integrates **WebGL** shaders for efficient image transformations and visual effects.

## 📸 **Screenshots**  
*The prototype images displayed in the design of the application are illustrative references used for showcasing the filter processes. The project do not feature aesthetic images but instead utilize real-time webcam feeds for filter application and face recognition.*  
![Filter Showcase](/assets/UI-Figma/Frame1.png)
![Filter Showcase](/assets/UI-Figma/Frame2.png)
![Filter Showcase](/assets/UI-Figma/Frame3.png)
![Filter Showcase](/assets/UI-Figma/Frame4.png)
![Filter Showcase](/assets/UI-Figma/Frame5.png)
![Filter Showcase](/assets/UI-Figma/Frame6.png)

## 💻 **How to Use**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUserName/Serein-Kunst.git
   ```
2. **Run the app locally**:
   Open `index.html` in your browser to start applying filters in real-time!

## 🌈 **Contributions & Roadmap**

- **Open for Collaboration**: We are constantly evolving. Feel free to fork the repo, submit pull requests, or open issues!
- **Future Plans**:
  - Implement **AI-based artistic filters**
  - Integrate **Gesture Recognition** for interactive art creation
  - Expand the library of custom filters
