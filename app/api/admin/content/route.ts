import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const CONTENT_DIR = path.join(process.cwd(), "data", "content")

// Убедимся, что директория существует
async function ensureContentDir() {
  try {
    await fs.access(CONTENT_DIR)
  } catch {
    await fs.mkdir(CONTENT_DIR, { recursive: true })
  }
}

export async function GET() {
  try {
    await ensureContentDir()

    const files = await fs.readdir(CONTENT_DIR)
    const content = []

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(CONTENT_DIR, file)
        const fileContent = await fs.readFile(filePath, "utf-8")
        const data = JSON.parse(fileContent)
        content.push(data)
      }
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error("Error loading content:", error)
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureContentDir()

    const contentItem = await request.json()
    const fileName = `${contentItem.type}_${contentItem.language}_${contentItem.id}.json`
    const filePath = path.join(CONTENT_DIR, fileName)

    await fs.writeFile(filePath, JSON.stringify(contentItem, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving content:", error)
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 })
  }
}
