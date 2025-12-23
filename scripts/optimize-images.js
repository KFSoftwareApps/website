const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const MAX_WIDTH = 1920;
const QUALITY = 80;

// Recursive function to get all image files
function getFiles(dir) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    });
    return Array.prototype.concat(...files);
}

async function optimizeImages() {
    const files = getFiles(PUBLIC_DIR);
    // Filter for images (png, jpg, jpeg) - skip svg/ico
    const images = files.filter(file => /\.(png|jpe?g)$/i.test(file));

    console.log(`Found ${images.length} images. Starting optimization...`);

    for (const file of images) {
        try {
            const metadata = await sharp(file).metadata();

            // Skip if already optimized or small enough (simple heuristic)
            if (metadata.width <= MAX_WIDTH && metadata.format === 'webp') {
                continue;
            }

            // We are NOT converting everything to WebP because it might break hardcoded paths in code.
            // We will just optimize the existing file in place if it's too large, 
            // OR we can generate substantial savings by just re-compressing.

            // For safety in this task, let's just log what would be done or do a safe optimization (lossless-ish).
            // Actually, let's resize if width > MAX_WIDTH.

            if (metadata.width > MAX_WIDTH) {
                console.log(`Resizing ${path.basename(file)} from ${metadata.width}px to ${MAX_WIDTH}px...`);
                const buffer = await sharp(file)
                    .resize(MAX_WIDTH)
                    .toBuffer();
                fs.writeFileSync(file, buffer);
            }

            // Note: Full WebP conversion implies changing all "src" in code. 
            // For now, we only resize large assets to save space/bandwidth.

        } catch (err) {
            console.error(`Error processing ${path.basename(file)}:`, err.message);
        }
    }
    console.log('Image optimization complete.');
}

optimizeImages();
