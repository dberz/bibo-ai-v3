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
  const prompt = `Modern, visually appealing book cover for "${book.title}" by ${book.author}, featuring the main characters from the story. High detail, vibrant colors, contemporary design.`
  const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1536',
      response_format: 'url',
    }),
  })
  if (!dalleRes.ok) {
    throw new Error(await dalleRes.text())
  }
  const data = await dalleRes.json()
  const imageUrl = data.data?.[0]?.url
  if (!imageUrl) throw new Error('No image URL returned from DALL·E')

  // Download the image
  const imageRes = await fetch(imageUrl)
  if (!imageRes.ok) throw new Error('Failed to download generated image')
  const arrayBuffer = await imageRes.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Save to public/generated-covers/
  const fileName = `${slugify(book.title)}.png`
  const saveDir = path.join(__dirname, '../public/generated-covers')
  fs.mkdirSync(saveDir, { recursive: true })
  const filePath = path.join(saveDir, fileName)
  fs.writeFileSync(filePath, buffer)

  return `/generated-covers/${fileName}`
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