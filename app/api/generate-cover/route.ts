console.log("=== /api/generate-cover route loaded ===");

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
  console.log("=== POST handler called ===");
  try {
    console.log("[generate-cover] Starting cover generation request");
    const { title, author, description } = await req.json()
    console.log("[generate-cover] Request payload:", { title, author, description });

    // Validation
    if (!title || !author) {
      console.error("[generate-cover] Missing title or author", { title, author });
      return NextResponse.json({ error: "Missing title or author" }, { status: 400 })
    }
    
    const prompt = `Create a modern, 2D flat illustration for the digital thumbnail of the book "${title}" by ${author}.

    This should look like a digital poster — no book, no physical context, no perspective or 3D rendering. Avoid hands, shadows, tables, mockups, lighting effects, or angled views. Use symbolic or graphic elements with strong colors and typography suitable for thumbnail display.`
    
    console.log("[generate-cover] Generated prompt:", prompt);

    // Log the prompt and payload
    console.log("[generate-cover] Prompt:", prompt)
    const openAIPayload = {
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1792",
      response_format: "url"
    }
    console.log("[generate-cover] OpenAI Payload:", openAIPayload)

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error("[generate-cover] Missing OpenAI API key!");
      return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 })
    }

    console.log("[generate-cover] Calling OpenAI API");
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
      console.error("[generate-cover] OpenAI API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      return NextResponse.json({ error: `OpenAI API error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    console.log("[generate-cover] OpenAI API response:", data);

    const imageUrl = data.data?.[0]?.url
    if (!imageUrl) {
      console.error("[generate-cover] No image URL returned from DALL·E", data);
      return NextResponse.json({ error: "No image URL returned from DALL·E" }, { status: 500 })
    }

    // Download the image
    const imageRes = await fetch(imageUrl)
    if (!imageRes.ok) {
      console.error("[generate-cover] Failed to download generated image", imageUrl);
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
    console.log("[generate-cover] Success! Saved cover to", localPath);
    return NextResponse.json({ imageUrl: localPath })
  } catch (error) {
    console.error("[generate-cover] Unexpected error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}