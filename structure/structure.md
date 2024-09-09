# Structure

```Javascript
└── 📁IMG-PROCESSING-APP-ML5
    └── 📁assets // Contains static files
        └── 📁custom // Custom assets for filters or UI components
        └── 📁landing // Media files for the landing page
    └── 📁docs // Documentation files
    └── 📁libraries // JavaScript libraries
        └── p5.dom.js // p5.js DOM library
        └── p5.min.js // Main p5.js library
    └── 📁src // Core source code
        └── 📁components // Reusable DOM components
            └── circular-slider.js // UI for circular sliders
            └── colorspace-threshold.js // Colorspace threshold UI
            └── colorspace.js // Colorspace section UI
            └── flat-slider.js // UI for flat sliders
            └── hero.js // Hero section UI
            └── navbar.js // Navbar UI
            └── rabbitspace.js // Rabbit Filter UI
            └── rgb-channel.js // RGB Channel section UI
        └── 📁config // Configuration files and constants
            └── constants.js // Global constants
            └── keyboardControls.js // Keyboard controls management
        └── 📁events // Event handling
            └── events.js // Custom event listeners
        └── 📁utils // Utility and helper functions
            └── 📁processors // Image and DOM processing
                └── colorSpaceProcessor.js // Color space conversion logic
                └── imageProcessor.js // Image saving and loading
                └── tintSpaceProcessor.js // RGB channel processing
            └── colorConverter.js // Color format conversion utilities
            └── colorSpaceConversion.js // Color space conversion methods
            └── cuteFilters.js // Manages Rabbit Filter
            └── faceDetection.js // Face detection logic (ML5.js)
            └── imageEffects.js // Pixelation, blur effects
            └── imageProcessing.js // Grayscale, threshold, channel extraction
            └── webcam.js // Webcam management
        └── main.js // Entry point for the app
    └── 📁structure
        └── structure.md // Project structure documentation
    └── 📁styles
        └── styles.css // Central stylesheet
    └── index.html // Main HTML file
```
