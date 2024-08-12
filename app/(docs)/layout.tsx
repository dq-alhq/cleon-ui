import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import React from 'react'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className='flex-1'>{children}</main>
            <Footer />
        </>
    )
}
