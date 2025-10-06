import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Career Guidance Platform for Indian Students',
  description: 'Discover your perfect career path through comprehensive assessment and personalized guidance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
