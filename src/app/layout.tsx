"use client"

import Provider from "./Provider"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-gray-300">
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
