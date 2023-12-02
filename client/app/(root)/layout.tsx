import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import Bottombar from '@/components/shared/Bottombar';
import LeftSideBar from '@/components/shared/LeftSidebar';
import RightSideBar from '@/components/shared/RightSidebar';
import Topbar from '@/components/shared/Topbar';


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
        <body className={inter.className}>
          <Topbar />
          <main className='flex flex-row'>
            <LeftSideBar />
            <main className='main-container'>
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </main>
            <RightSideBar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
