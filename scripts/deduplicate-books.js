const fs = require('fs');
const path = require('path');

// Path to your books.ts file
const booksFile = path.join(__dirname, '../lib/books.ts');
const outputFile = path.join(__dirname, '../lib/books.deduped.ts');

// Read the file as text
const text = fs.readFileSync(booksFile, 'utf8');

// Extract the books array using a regex (assumes array starts with [ and ends with ])
const match = text.match(/const books: Book\[\] = (\[.*\]);/s);
if (!match) {
  console.error('Could not find books array in books.ts');
  process.exit(1);
}

const booksArrayText = match[1];

// Use eval in a sandboxed way to parse the array (since it's JS, not JSON)
let books;
try {
  // Remove comments and trailing commas for eval safety
  const cleaned = booksArrayText
    .replace(/\/\/.*$/gm, '')
    .replace(/,\s*]/g, ']')
    .replace(/,\s*}/g, '}');
  books = eval(cleaned);
} catch (e) {
  console.error('Failed to parse books array:', e);
  process.exit(1);
}

// Deduplicate by id, keeping the last occurrence
const deduped = Object.values(
  books.reduce((acc, book) => {
    acc[book.id] = book;
    return acc;
  }, {})
);

// Output as a new TypeScript file
const output = `// Deduplicated books array\nconst books: Book[] = ${JSON.stringify(deduped, null, 2)};\n\nexport default books;\n`;
fs.writeFileSync(outputFile, output);

console.log('Deduplicated books written to:', outputFile);
