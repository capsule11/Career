import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}