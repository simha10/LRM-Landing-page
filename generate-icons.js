import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = './public/logo.png';
const outputPath = './public';

// Ensure output directory exists
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

// Generate different icon sizes
const sizes = [192, 512];

async function generateIcons() {
    try {
        // Check if input file exists
        if (!fs.existsSync(inputPath)) {
            console.log('Logo file not found, using placeholder');
            // Create a simple placeholder if logo doesn't exist
            return;
        }

        console.log('Generating icons...');

        for (const size of sizes) {
            const outputFileName = `icon-${size}x${size}.png`;
            const outputPathFile = path.join(outputPath, outputFileName);

            await sharp(inputPath)
                .resize(size, size)
                .png()
                .toFile(outputPathFile);

            console.log(`Generated ${outputFileName}`);
        }

        console.log('Icon generation complete!');
    } catch (error) {
        console.error('Error generating icons:', error);
    }
}

generateIcons();