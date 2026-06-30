import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Christians Whisky Sammlung",
  description: "Private Kollektion – ausgewählte Einzelfassabfüllungen und Raritäten",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-[#0f0f0f] text-[#f5f0e8] flex flex-col">
        {children}
      </body>
    </html>
  )
}
