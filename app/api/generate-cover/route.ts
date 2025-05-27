import { NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs/promises"

export const runtime = "nodejs"

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function POST(req: NextRequest) {
  const { title, author, description } = await req.json()
  const prompt = `Book cover for "${title}" by ${author}. ${description || "Classic public domain literature."} Vintage illustrated book cover, high detail, vibrant colors.`

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 })
  }

  const dalleRes = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1536",
      response_format: "url"
    }),
  })

  if (!dalleRes.ok) {
    const error = await dalleRes.text()
    return NextResponse.json({ error }, { status: dalleRes.status })
  }

  const data = await dalleRes.json()
  const imageUrl = data.data?.[0]?.url
  if (!imageUrl) {
    return NextResponse.json({ error: "No image URL returned from DALL·E" }, { status: 500 })
  }

  // Download the image
  const imageRes = await fetch(imageUrl)
  if (!imageRes.ok) {
    return NextResponse.json({ error: "Failed to download generated image" }, { status: 500 })
  }
  const arrayBuffer = await imageRes.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Save to public/generated-covers/
  const fileName = `${slugify(title)}.png`
  const saveDir = path.join(process.cwd(), "public", "generated-covers")
  await fs.mkdir(saveDir, { recursive: true })
  const filePath = path.join(saveDir, fileName)
  await fs.writeFile(filePath, buffer as Uint8Array)

  const localPath = `/generated-covers/${fileName}`
  return NextResponse.json({ imageUrl: localPath })
}