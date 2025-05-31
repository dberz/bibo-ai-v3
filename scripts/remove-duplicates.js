const fs = require('fs');
const path = require('path');

// Read the books.ts file
const booksPath = path.join(__dirname, '../lib/books.ts');
let content = fs.readFileSync(booksPath, 'utf8');

// Find all book entries and their line ranges
const bookEntries = [];
const lines = content.split('\n');
let currentEntry = null;
let braceCount = 0;
let entryStart = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this line starts a new book entry
  if (line.trim().startsWith('{') && line.includes('id:') && line.includes('"')) {
    if (currentEntry) {
      // Close previous entry
      currentEntry.end = i - 1;
      bookEntries.push(currentEntry);
    }
    
    // Extract the ID
    const idMatch = line.match(/id:\s*"([^"]+)"/);
    if (idMatch) {
      currentEntry = {
        id: idMatch[1],
        start: i,
        end: -1
      };
      entryStart = i;
      braceCount = 0;
    }
  }
  
  // Count braces to find the end of the current entry
  if (currentEntry) {
    for (const char of line) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
      
      if (braceCount === 0 && entryStart !== i) {
        currentEntry.end = i;
        bookEntries.push(currentEntry);
        currentEntry = null;
        break;
      }
    }
  }
}

// Close the last entry if it exists
if (currentEntry) {
  currentEntry.end = lines.length - 1;
  bookEntries.push(currentEntry);
}

// Find duplicates
const seenIds = new Set();
const duplicates = [];

for (const entry of bookEntries) {
  if (seenIds.has(entry.id)) {
    duplicates.push(entry);
  } else {
    seenIds.add(entry.id);
  }
}

console.log('Found duplicate entries:');
duplicates.forEach(dup => {
  console.log(`- ${dup.id} (lines ${dup.start + 1}-${dup.end + 1})`);
});

// Remove duplicates (keep the first occurrence, remove the rest)
let newContent = content;
let offset = 0;

// Sort duplicates by start line in descending order to remove from bottom to top
duplicates.sort((a, b) => b.start - a.start);

for (const dup of duplicates) {
  const startLine = dup.start - offset;
  const endLine = dup.end - offset;
  
  // Remove the duplicate entry
  const linesToRemove = endLine - startLine + 1;
  const newLines = newContent.split('\n');
  newLines.splice(startLine, linesToRemove);
  newContent = newLines.join('\n');
  
  offset += linesToRemove;
}

// Write the cleaned content back
fs.writeFileSync(booksPath, newContent);

console.log(`\nRemoved ${duplicates.length} duplicate entries.`);
console.log('Books.ts file has been cleaned up.'); 