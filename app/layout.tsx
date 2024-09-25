import React from 'react'

import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

import { Providers } from '@/components/providers'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import '@/styles/app.css'
import { Analytics } from '@vercel/analytics/react'

const fontSans = localFont({
    src: './fonts/sans/GeistVF.woff',
    variable: '--font-sans'
})
const fontMono = localFont({
    src: './fonts/mono/GeistMonoVF.woff',
    variable: '--font-mono'
})

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url)
}

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' }
    ]
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={cn(
                    'mx-auto min-h-svh scroll-smooth bg-background font-sans antialiased',
                    fontSans.variable,
                    fontMono.variable
                )}
            >
                <Providers>
                    <main className='relative flex min-h-dvh flex-col bg-background'>
                        {children}
                    </main>
                    <Analytics />
                </Providers>
            </body>
        </html>
    )
}
