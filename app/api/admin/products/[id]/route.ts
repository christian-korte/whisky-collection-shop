import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts, saveProducts } from '@/lib/products'
import fs from 'fs'
import path from 'path'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const products = getAllProducts()
  const index = products.findIndex(p => p.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  }

  const body = await request.json()
  products[index] = { ...products[index], ...body, id: params.id }
  saveProducts(products)
  return NextResponse.json(products[index])
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const products = getAllProducts()
  const product = products.find(p => p.id === params.id)
  if (!product) {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  }

  // Bilddateien löschen
  for (const img of product.images) {
    if (img.startsWith('/images/whisky/')) {
      const filePath = path.join(process.cwd(), 'public', img)
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
  }

  const updated = products.filter(p => p.id !== params.id)
  saveProducts(updated)
  return NextResponse.json({ success: true })
}
