import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: 'QuantForge AI | Autonomous Multi-Agent Hedge Fund Simulator',
  description: 'Deploy autonomous AI agents to analyze markets, generate alpha strategies, and simulate institutional hedge fund operations. Built for the next generation of quantitative investing.',
  keywords: ['hedge fund', 'AI', 'quantitative trading', 'portfolio management', 'alpha generation', 'risk analysis'],
  authors: [{ name: 'QuantForge AI' }],
  creator: 'QuantForge AI',
  openGraph: {
    title: 'QuantForge AI | Autonomous Multi-Agent Hedge Fund Simulator',
    description: 'Deploy autonomous AI agents to analyze markets, generate alpha strategies, and simulate institutional hedge fund operations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuantForge AI',
    description: 'Autonomous Multi-Agent Hedge Fund Simulator',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a12',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}>
        {children}
        <Toaster position="bottom-right" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
