import { mkdir, copyFile } from 'node:fs/promises';
const files = ['index.html', 'styles.css', 'app.js', 'content.js', 'favicon.svg'];
await mkdir('dist', { recursive: true });
await Promise.all(files.map(file => copyFile(file, `dist/${file}`)));
console.log(`Built ${files.length} files into dist/`);
