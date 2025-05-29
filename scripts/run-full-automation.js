const { execSync } = require('child_process');
const path = require('path');

const exportBooksJsonScript = path.join(__dirname, 'export-books-json.js');
const generateCoversScript = path.join(__dirname, 'generate-covers.js');
const updateCoverUrlsScript = path.join(__dirname, 'update-cover-urls.js');

console.log("Starting full automation workflow...");

// Step 1: Export books array from lib/books.ts to lib/books.json
console.log("Step 1: Exporting books array to lib/books.json...");
execSync('node ' + exportBooksJsonScript, { stdio: 'inherit' });

// Step 2: Generate SVG covers for books missing cover art (using lib/books.json)
console.log("Step 2: Generating SVG covers (using generate-covers.js)...");
execSync('node ' + generateCoversScript, { stdio: 'inherit' });

// Step 3: Update coverUrl in lib/books.ts for books that now have a generated cover
console.log("Step 3: Updating coverUrl in lib/books.ts...");
execSync('node ' + updateCoverUrlsScript, { stdio: 'inherit' });

console.log("Full automation completed."); 