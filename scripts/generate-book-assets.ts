import { gutenbergService } from '../lib/gutenberg-service';
import { books } from '../lib/books';
import fs from 'fs/promises';
import path from 'path';
import { Book } from '../types/book';
import { existsSync } from 'fs';

async function generateCover(book: Book) {
  try {
    const res = await fetch('http://localhost:3000/api/generate-cover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        description: book.description
      })
    });

    if (!res.ok) {
      throw new Error(`Failed to generate cover: ${res.statusText}`);
    }

    const data = await res.json();
    return data.imageUrl;
  } catch (error) {
    console.error(`Error generating cover for ${book.title}:`, error);
    return null;
  }
}

async function updateBookData(book: Book, updates: Partial<Book>) {
  const booksPath = path.join(process.cwd(), 'lib', 'books.ts');
  let content = await fs.readFile(booksPath, 'utf-8');

  // Find the book object in the file
  const bookRegex = new RegExp(`{[^}]*"id"\\s*:\\s*"${book.id}"[^}]*}`, 'g');
  const bookMatch = content.match(bookRegex);

  if (!bookMatch) {
    console.error(`Could not find book ${book.id} in books.ts`);
    return;
  }

  const bookStr = bookMatch[0];
  let updatedBookStr = bookStr;

  // Update each field
  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined) return;

    const valueStr = typeof value === 'string' ? `"${value}"` : JSON.stringify(value);
    const regex = new RegExp(`"${key}"\\s*:\\s*[^,}]+`, 'g');
    
    if (bookStr.includes(`"${key}"`)) {
      // Update existing field
      updatedBookStr = updatedBookStr.replace(regex, `"${key}": ${valueStr}`);
    } else {
      // Add new field
      updatedBookStr = updatedBookStr.replace(/}$/, `, "${key}": ${valueStr}}`);
    }
  });

  // Replace the book object in the file
  content = content.replace(bookRegex, updatedBookStr);
  await fs.writeFile(booksPath, content, 'utf-8');
}

async function processBook(book: Book) {
  console.log(`\nProcessing ${book.title}...`);

  // Standardize cover path
  const standardizedCoverUrl = `/generated-covers/${book.id}.png`;
  const coverPath = path.join(process.cwd(), 'public', 'generated-covers', `${book.id}.png`);

  // 1. Check if the cover file exists
  let coverExists = existsSync(coverPath);

  if (!coverExists) {
    console.log('Generating cover...');
    const coverUrl = await generateCover(book);
    if (coverUrl) {
      await updateBookData(book, { coverUrl: standardizedCoverUrl });
      console.log('Cover generated and standardized');
    }
  } else if (book.coverUrl !== standardizedCoverUrl) {
    // Standardize the coverUrl if not already
    await updateBookData(book, { coverUrl: standardizedCoverUrl });
    console.log('Standardized coverUrl');
  }

  // 2. Fetch content from Gutenberg if missing chapters
  if (!book.chapters || book.chapters.length === 0) {
    console.log('Fetching content from Gutenberg...');
    const updatedBook = await gutenbergService.getBookWithContent(book);
    
    if (updatedBook) {
      await updateBookData(book, {
        chapters: updatedBook.chapters,
        gutenbergId: updatedBook.gutenbergId,
        source: 'gutenberg',
        lastUpdated: new Date().toISOString()
      });
      console.log(`Fetched ${updatedBook.chapters.length} chapters`);
    } else {
      console.log('Could not fetch content from Gutenberg');
    }
  }

  // Add a delay between books to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 2000));
}

async function main() {
  console.log('Starting book asset generation...');
  
  // Only process the first 5 books for debugging
  const booksToProcess = books.slice(0, 5);
  for (const book of booksToProcess) {
    await processBook(book);
  }

  console.log('\nBook asset generation complete!');
}

main().catch(console.error); 