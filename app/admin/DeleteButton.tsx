'use client'

import { useRouter } from 'next/navigation'

export default function DeleteButton({
  productId,
  productName,
}: {
  productId: string
  productName: string
}) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`"${productName}" wirklich löschen?`)) return
    await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-400 transition-colors">
      Löschen
    </button>
  )
}
