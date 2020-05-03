import fs from 'fs';
import path from 'path';

const baseDir = path.resolve(__dirname, '../uploads');

async function saveImage(base64Image: string): Promise<void> {
    await fs.writeFile('image.png', base64Image, { encoding: 'base64' }, () => {
        path.resolve(__dirname, '..', 'uploads');
    });
}

export default saveImage;
