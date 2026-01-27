const sharp = require('sharp');
const fs = require('fs');

async function optimizeIcon() {
  const inputPath = './public/Rener_Icon_Green.png';
  const outputPath = './public/Rener_Icon_Green_optimized.png';
  
  try {
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    console.log(`Original size: ${(originalStats.size / 1024).toFixed(2)} KB`);
    
    // Optimize the image
    await sharp(inputPath)
      .resize(48, 48, { // Resize to the exact dimensions used in the navbar
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ 
        quality: 90,
        compressionLevel: 9,
        palette: true // Use palette-based PNG for smaller file size
      })
      .toFile(outputPath);
    
    // Get optimized file size
    const optimizedStats = fs.statSync(outputPath);
    console.log(`Optimized size: ${(optimizedStats.size / 1024).toFixed(2)} KB`);
    console.log(`Savings: ${((1 - optimizedStats.size / originalStats.size) * 100).toFixed(2)}%`);
    console.log(`\nOptimized file saved as: ${outputPath}`);
    console.log('Please review the optimized image and if satisfied, rename it to replace the original.');
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

optimizeIcon();
