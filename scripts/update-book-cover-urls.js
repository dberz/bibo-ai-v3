const fs = require('fs');
const path = require('path');

const booksFile = path.join(__dirname, '../lib/books.ts');
const coversDir = path.join(__dirname, '../public/book-covers');

// Get all PNG cover filenames
const coverFiles = fs.readdirSync(coversDir).filter(f => f.endsWith('.png'));

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

// Read the books.ts file
let content = fs.readFileSync(booksFile, 'utf8');

// Regex to find all book objects
const bookRegex = /({\s*id:\s*"([^"]+)",[\s\S]*?coverUrl:\s*"([^"]*)",[\s\S]*?}),/g;
content = content.replace(bookRegex, (match, bookObj, id, oldCoverUrl) => {
  // Try to find a matching cover file by id or slugified title
  let found = null;
  for (const file of coverFiles) {
    if (file === `${id}.png`) {
      found = file;
      break;
    }
  }
  if (!found) {
    const titleMatch = /title:\s*"([^"]+)"/.exec(bookObj);
    if (titleMatch) {
      const titleSlug = slugify(titleMatch[1]);
      for (const file of coverFiles) {
        if (file === `${titleSlug}.png`) {
          found = file;
          break;
        }
      }
    }
  }
  const newCoverUrl = found ? `/book-covers/${found}` : '/placeholder.svg';
  return bookObj.replace(/coverUrl:\s*"([^"]*)"/, `coverUrl: "${newCoverUrl}"`) + ',';
});

fs.writeFileSync(booksFile, content, 'utf8');
console.log("Updated coverUrl in lib/books.ts for all books."); 