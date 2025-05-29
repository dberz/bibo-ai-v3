const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY in environment')
  process.exit(1)
}

// Import books array from lib/books.ts (or require a JSON export)
const books = require('../lib/books.json') // You may need to export your books as JSON for this script

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

async function generateCover(book) {
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

async function main() {
  for (const book of books) {
    if (!book.coverUrl || book.coverUrl === '/placeholder.svg') {
      try {
        console.log(`Generating cover for: ${book.title}`)
        const newCoverUrl = await generateCover(book)
        console.log(`  coverUrl: "${newCoverUrl}"`)
      } catch (err) {
        console.error(`Failed for ${book.title}:`, err.message)
      }
    }
  }
}

main() 