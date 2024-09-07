'use client'

import { IconBrandCleon } from 'cleon-icons'

import { ThemeToggle } from '@/components/theme-toggle'
import { Topbar } from '@/components/ui'

export default function TopbarLayout() {
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
            <div className='p-4 md-p-6 w-full'>
                <div className='p-4 container flex justify-center items-center w-full min-h-[calc(100vh-3rem)] border-2 border-dashed rounded-lg'>
                    <h1 className='text-2xl md:text-5xl text-muted-foreground text-center'>
                        PLACE YOUR CONTENT HERE
                    </h1>
                </div>
            </div>
        </div>
    )
}
