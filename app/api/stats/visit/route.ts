import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const STATS_PATH = path.join(process.cwd(), 'data', 'stats.json')

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json()
    if (!slug) return NextResponse.json({ ok: true })

    let stats: { visits: Record<string, number>; offers: Record<string, number> } = { visits: {}, offers: {} }
    if (fs.existsSync(STATS_PATH)) {
      stats = JSON.parse(fs.readFileSync(STATS_PATH, 'utf-8'))
    }
    stats.visits = stats.visits ?? {}
    stats.visits[slug] = (stats.visits[slug] ?? 0) + 1
    fs.writeFileSync(STATS_PATH, JSON.stringify(stats, null, 2))
  } catch (e) {
    console.error('Visit stat error:', e)
  }
  return NextResponse.json({ ok: true })
}
