import "./globals.css"
import { Inter } from "next/font/google"
import Script from "next/script"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Text Scramble Effect",
  description: "Cyberpunk-style text scramble effect using GSAP",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js" />
      </body>
    </html>
  )
}

