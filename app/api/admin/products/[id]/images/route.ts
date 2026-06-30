import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts, saveProducts } from '@/lib/products'
import fs from 'fs'
import path from 'path'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { imageUrl } = await request.json()
  const products = getAllProducts()
  const index = products.findIndex(p => p.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  }

  // Physische Datei löschen
  if (imageUrl && imageUrl.startsWith('/images/whisky/')) {
    const filePath = path.join(process.cwd(), 'public', imageUrl)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  }

  products[index].images = products[index].images.filter(img => img !== imageUrl)
  saveProducts(products)
  return NextResponse.json({ success: true })
}
