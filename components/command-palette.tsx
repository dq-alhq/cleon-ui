'use client'

import * as React from 'react'

import { docs } from '#site/content'
import { usePathname, useRouter } from 'next/navigation'

import { Command } from '@/components/ui'
import { useMediaQuery } from '@/lib/utils'

export interface OpenCloseProps {
    open: boolean
    setOpen?: (isOpen: boolean) => void
}
export function CommandPalette({ open, setOpen }: OpenCloseProps) {
    const router = useRouter()
    const pathname = usePathname()
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k') {
                e.preventDefault()
                // @ts-ignore
                setOpen((open: boolean) => !open)
            }
        }

        document.addEventListener('keydown', down)

        return () => document.removeEventListener('keydown', down)
    }, [pathname, setOpen])

    React.useEffect(() => {
        if (setOpen) {
            setOpen(false)
        }
    }, [pathname, setOpen])

    const isDesktop = useMediaQuery('(min-width: 1024px)')
    return (
        <Command isOpen={open} onOpenChange={setOpen}>
            <Command.Input autoFocus={isDesktop} placeholder='Search Component' />
            <Command.List>
                <Command.Empty>No results found.</Command.Empty>
                <Command.Section heading='Components'>
                    {docs.map((item, i) => (
                        <Command.Item
                            key={i}
                            onSelect={() => router.push(`/${item.slug}`)}
                        >
                            {item.title}
                        </Command.Item>
                    ))}
                </Command.Section>
            </Command.List>
        </Command>
    )
}
