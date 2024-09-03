import React from 'react'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className='flex-1'>{children}</main>
            <Footer />
        </>
    )
}
