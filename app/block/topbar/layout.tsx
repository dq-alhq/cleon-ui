'use client'

import { IconBrandCleon } from 'cleon-icons'

import { ThemeToggle } from '@/components/theme-toggle'
import { Topbar } from '@/components/ui'

export default function TopbarLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col min-h-screen'>
            <Topbar>
                <Topbar.Navigation>
                    <Topbar.Brand>
                        <IconBrandCleon />
                    </Topbar.Brand>
                    <Topbar.Link active href='/blocks'>
                        Blocks
                    </Topbar.Link>
                    <Topbar.Link href='/icons'>Icons</Topbar.Link>
                </Topbar.Navigation>
                <Topbar.Right>
                    <ThemeToggle />
                </Topbar.Right>
            </Topbar>
            {children}
        </div>
    )
}
