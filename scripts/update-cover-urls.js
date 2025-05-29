const fs = require('fs');
const path = require('path');

const booksFile = path.join(__dirname, '../lib/books.ts');
const coversDir = path.join(__dirname, '../public/generated-covers');

// Read the generated covers (SVG files) from /public/generated-covers
const generatedCovers = fs.readdirSync(coversDir).filter(file => file.endsWith('.svg')).map(file => path.basename(file, '.svg'));

// Read the TS file content
let content = fs.readFileSync(booksFile, 'utf8');

// For each generated cover (e.g. "moby-dick.svg"), update the coverUrl in lib/books.ts
generatedCovers.forEach(bookId => {
  // Use a regex to find the book object (assuming the book's "id" is "bookId")
  const regex = new RegExp(`({[^}]*"id"\\s*:\\s*"${bookId}"[^}]*"coverUrl"\\s*:\\s*")([^"]*)(")`, 'g');
  const replacer = (match, p1, p2, p3) => {
    // If the coverUrl is missing or a placeholder, update it.
    if (!p2 || p2 === '/placeholder.svg') {
      return p1 + '/generated-covers/' + bookId + '.svg' + p3;
    }
    return match;
  };
  content = content.replace(regex, replacer);
});

// Write the updated content back to lib/books.ts
fs.writeFileSync(booksFile, content, 'utf8');
console.log("Updated coverUrl in lib/books.ts for generated covers."); 