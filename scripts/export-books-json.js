const fs = require('fs');
const path = require('path');

const booksFile = path.join(__dirname, '../lib/books.ts');
const outFile = path.join(__dirname, '../lib/books.json');

// Read the file content
const content = fs.readFileSync(booksFile, 'utf8');

// Updated regex: match "const books" (with optional type annotation) followed by "=" and an array.
const regex = /const\s+books(?:\s*:\s*Book\s*\[\])?\s*=\s*(\[[\s\S]*?\]);/m;
const match = content.match(regex);

if (!match) {
  console.error("Could not find a books array in lib/books.ts. Please ensure that the books array is defined as "const books = [ ... ];" (or "const books: Book[] = [ ... ];").");
  process.exit(1);
}

// The first capture group is the JSON-like array (but in TS syntax). We'll use eval (or a TS parser) to convert it.
// Note: In a production environment, you might use a TS parser (e.g., ts-node, ts-morph) to parse the TS file.
// For simplicity, we're using eval (or Function) here. (Be careful if the TS file contains arbitrary code.)
let booksArray;
try {
  // Use Function to evaluate the TS array (this is a quick-and-dirty approach; in production, use a TS parser)
  booksArray = (new Function("return " + match[1]))();
} catch (e) {
  console.error("Error parsing the books array from TS. (Consider using a TS parser.)", e);
  process.exit(1);
}

// Write the books array as JSON to lib/books.json
fs.writeFileSync(outFile, JSON.stringify(booksArray, null, 2), 'utf8');
console.log("Books exported to lib/books.json."); 