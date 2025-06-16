import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const CONTENT_DIR = path.join(process.cwd(), "data", "content")

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const files = await fs.readdir(CONTENT_DIR)
    const targetFile = files.find((file) => file.includes(params.id))

    if (targetFile) {
      const filePath = path.join(CONTENT_DIR, targetFile)
      await fs.unlink(filePath)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Content not found" }, { status: 404 })
  } catch (error) {
    console.error("Error deleting content:", error)
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 })
  }
}
