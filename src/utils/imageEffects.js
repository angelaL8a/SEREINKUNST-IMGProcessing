class ImageEffects {
  /**
   * Applies a blur effect to the image.
   *
   * This method creates a copy of the current image, processes each pixel using
   * a convolution with a blur matrix, and then updates the pixel data of the new
   * image. The level of blur can be adjusted by changing the `levelBlur` parameter.
   *
   * @param {number} levelBlur - The intensity of the blur effect (default is 1).
   * @returns {p5.Image} A new image object with the blur effect applied.
   */
  applyBlur(image, levelBlur = 1) {
    let blurredImage = this._createCopy(image);
    // Create a blur matrix based on the levelBlur parameter
    const blurMatrix = this._generateBlurMatrix(levelBlur);

    blurredImage.loadPixels();

    // Apply the convolution operation to each pixel in the image
    for (let x = 0; x < blurredImage.width; x++) {
      for (let y = 0; y < blurredImage.height; y++) {
        const pixelIndex = (y * blurredImage.width + x) * 4;
        const [red, green, blue] = this._convolution(x, y, blurMatrix, image);
        // Update the pixel values in the new image
        blurredImage.pixels[pixelIndex] = red;
        blurredImage.pixels[pixelIndex + 1] = green;
        blurredImage.pixels[pixelIndex + 2] = blue;
        blurredImage.pixels[pixelIndex + 3] = 255;
      }
    }

    blurredImage.updatePixels();
    return blurredImage;
  }

  /**
   * Apply a pixelation effect to an image by averaging the grayscale values in blocks.
   *
   * @param {p5.Image} image - The image to apply the pixelation effect to.
   * @param {number} blockSize - The size of the blocks to average the grayscale values.
   * @returns {p5.Image} The pixelated grayscale image.
   */
  applyPixelationGrayScale(image, blockSize) {
    let pixelatedImage = this._createCopy(image);
    pixelatedImage.loadPixels();

    const pixelArray = pixelatedImage.pixels;
    const imageWidth = pixelatedImage.width;
    const imageHeight = pixelatedImage.height;

    for (let y = 0; y < pixelatedImage.height; y += blockSize) {
      for (let x = 0; x < pixelatedImage.width; x += blockSize) {
        let avgIntensity = this._calculateBlockAverage(
          pixelArray,
          x,
          y,
          blockSize,
          imageWidth,
          imageHeight
        );
        for (let blockY = 0; blockY < blockSize; blockY++) {
          for (let blockX = 0; blockX < blockSize; blockX++) {
            let pixelX = x + blockX;
            let pixelY = y + blockY;

            if (pixelX >= imageWidth || pixelY >= imageHeight) continue;

            let index = (pixelY * imageWidth + pixelX) * 4;
            pixelArray[index] = avgIntensity;
            pixelArray[index + 1] = avgIntensity;
            pixelArray[index + 2] = avgIntensity;
            pixelArray[index + 3] = 255;
          }
        }
      }
    }

    pixelatedImage.updatePixels();
    return pixelatedImage;
  }

  /**
   * Apply a pixelation effect to an image by averaging the colors in blocks.
   *
   * @param {p5.Image} image - The image to apply the pixelation effect to.
   * @param {number} blockSize - The size of the blocks to average the colors.
   * @returns {p5.Image} The pixelated image.
   */
  applyPixelationColor(image, blockSize) {
    let pixelatedImage = this._createCopy(image);
    pixelatedImage.loadPixels();

    const imageWidth = pixelatedImage.width;
    const imageHeight = pixelatedImage.height;

    for (let startX = 0; startX < imageWidth; startX += blockSize) {
      for (let startY = 0; startY < imageHeight; startY += blockSize) {
        // Calculate the average color of the current block
        const avgColor = this._calculateAverageColor(
          startX,
          startY,
          blockSize,
          pixelatedImage
        );

        // Paint the block with the average color
        this._paintBlock(startX, startY, blockSize, avgColor, pixelatedImage);
      }
    }

    pixelatedImage.updatePixels();
    return pixelatedImage;
  }

  /**
   * Calculates the average color of a block in the image.
   *
   * @param {number} startX - The x-coordinate of the top-left corner of the block.
   * @param {number} startY - The y-coordinate of the top-left corner of the block.
   * @param {number} blockSize - The size of the block.
   * @param {p5.Image} img - The image object.
   * @returns {Array<number>} An array containing the average red, green, and blue values.
   * @private
   */
  _calculateAverageColor(startX, startY, blockSize, img) {
    let totalRed = 0,
      totalGreen = 0,
      totalBlue = 0,
      pixelCount = 0;

    for (let offsetX = 0; offsetX < blockSize; offsetX++) {
      for (let offsetY = 0; offsetY < blockSize; offsetY++) {
        const currentX = startX + offsetX;
        const currentY = startY + offsetY;

        if (currentX < img.width && currentY < img.height) {
          const pixelIndex = (currentY * img.width + currentX) * 4;
          totalRed += img.pixels[pixelIndex];
          totalGreen += img.pixels[pixelIndex + 1];
          totalBlue += img.pixels[pixelIndex + 2];
          pixelCount++;
        }
      }
    }

    const avgRed = totalRed / pixelCount;
    const avgGreen = totalGreen / pixelCount;
    const avgBlue = totalBlue / pixelCount;

    return [avgRed, avgGreen, avgBlue];
  }

  /**
   * Paints a block of the image with the specified color.
   *
   * @param {number} startX - The x-coordinate of the top-left corner of the block.
   * @param {number} startY - The y-coordinate of the top-left corner of the block.
   * @param {number} blockSize - The size of the block.
   * @param {Array<number>} color - An array containing the red, green, and blue values to paint.
   * @param {p5.Image} img - The image object.
   * @private
   */
  _paintBlock(startX, startY, blockSize, color, img) {
    for (let offsetX = 0; offsetX < blockSize; offsetX++) {
      for (let offsetY = 0; offsetY < blockSize; offsetY++) {
        const currentX = startX + offsetX;
        const currentY = startY + offsetY;

        if (currentX < img.width && currentY < img.height) {
          const pixelIndex = (currentY * img.width + currentX) * 4;
          img.pixels[pixelIndex] = color[0];
          img.pixels[pixelIndex + 1] = color[1];
          img.pixels[pixelIndex + 2] = color[2];
        }
      }
    }
  }

  /**
   * Generates a blur matrix based on the specified blur level.
   *
   * Creates a square matrix used for applying a blur effect to an image.
   *
   * @param {number} levelBlur - The intensity of the blur effect.
   * Higher values result in a larger blur matrix.
   * @returns {number[][]} A 2D array representing the blur matrix.
   * @private
   **/
  _generateBlurMatrix(levelBlur) {
    const size = levelBlur * 2 + 1;
    const matrix = Array(size)
      .fill(null)
      .map(() => Array(size).fill(1 / size ** 2));
    return matrix;
  }

  /**
   * Applies a convolution operation to a pixel in the image.
   * @param {number} x - The x-coordinate of the pixel.
   * @param {number} y - The y-coordinate of the pixel.
   * @param {number[][]} matrix - The convolution matrix.
   * @param {p5.Image} img - The image object.
   * @returns {number[]} An array containing the red, green, and blue values.
   * @private
   **/
  _convolution(x, y, matrix, img) {
    let totalRed = 0,
      totalGreen = 0,
      totalBlue = 0;
    const matrixSize = matrix.length;
    const offset = Math.floor(matrixSize / 2);

    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        const xLoc = x + i - offset;
        const yLoc = y + j - offset;

        // Ensure the coordinates are within the image bounds
        if (xLoc >= 0 && xLoc < img.width && yLoc >= 0 && yLoc < img.height) {
          const index = (yLoc * img.width + xLoc) * 4;
          totalRed += img.pixels[index] * matrix[i][j];
          totalGreen += img.pixels[index + 1] * matrix[i][j];
          totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
      }
    }

    return [totalRed, totalGreen, totalBlue];
  }

  /**
   * Calculates the average intensity of a block of pixels in an image.
   *
   * @param {number[]} pixelArray - The array of pixel values.
   * @param {number} startX - The starting x-coordinate of the block.
   * @param {number} startY - The starting y-coordinate of the block.
   * @param {number} blockSize - The size of the block.
   * @param {number} imageWidth - The width of the image.
   * @param {number} imageHeight - The height of the image.
   * @returns {number} The average intensity of the block.
   */
  _calculateBlockAverage(
    pixelArray,
    startX,
    startY,
    blockSize,
    imageWidth,
    imageHeight
  ) {
    let totalIntensity = 0;
    let pixelCount = 0;

    for (let y = 0; y < blockSize; y++) {
      for (let x = 0; x < blockSize; x++) {
        let pixelX = startX + x;
        let pixelY = startY + y;

        if (pixelX >= imageWidth || pixelY >= imageHeight) continue;

        let index = (pixelY * imageWidth + pixelX) * 4;
        let red = pixelArray[index];
        let green = pixelArray[index + 1];
        let blue = pixelArray[index + 2];

        let intensity = (red + green + blue) / 3;
        totalIntensity += intensity;
        pixelCount++;
      }
    }

    return totalIntensity / pixelCount;
  }

  /**
   * Creates a copy of the current image.
   *
   * @returns {p5.Image} A copy of the original image.
   */
  _createCopy(image) {
    return image.get();
  }
}
