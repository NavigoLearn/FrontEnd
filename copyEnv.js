import { copyFile } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// specify the path of the source and destination
const source = join(__dirname, 'segment-env', '.env');
const destination = join(__dirname, '.env');

copyFile(source, destination, (err) => {
  if (err) {
    console.error('Error copying .env file: ', err);
    process.exit(1);
  } else {
    console.log('.env file copied successfully');
  }
});
