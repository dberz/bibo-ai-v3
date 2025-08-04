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
  try {
    const { title, author, description } = await req.json()

    // Validation
    if (!title || !author) {
      return NextResponse.json({ error: "Missing title or author" }, { status: 400 })
    }
    
    const prompt = `Create a modern, 2D flat illustration for the digital thumbnail of the book "${title}" by ${author}.

    This should look like a digital poster — no book, no physical context, no perspective or 3D rendering. Avoid hands, shadows, tables, mockups, lighting effects, or angled views. Use symbolic or graphic elements with strong colors and typography suitable for thumbnail display.`
    
    const openAIPayload = {
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1792",
      response_format: "url"
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 })
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(openAIPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `OpenAI API error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();

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

    // Try to save locally, fallback to direct URL if it fails
    try {
      const fileName = `${slugify(title)}.png`
      const saveDir = path.join(process.cwd(), "public", "generated-covers")
      await fs.mkdir(saveDir, { recursive: true })
      const filePath = path.join(saveDir, fileName)
      await fs.writeFile(filePath, buffer as Uint8Array)
      const localPath = `/generated-covers/${fileName}`
      return NextResponse.json({ imageUrl: localPath })
    } catch (fsError) {
      // If file system operations fail (e.g., on Vercel), return the direct URL
      return NextResponse.json({ imageUrl: imageUrl })
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}