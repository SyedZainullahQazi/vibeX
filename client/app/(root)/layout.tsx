import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import { ClerkProvider } from '@clerk/nextjs'

import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VibeX ',
  description: 'Connect with your university spaces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
