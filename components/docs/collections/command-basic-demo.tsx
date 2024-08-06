'use client'

import React, { useState } from 'react'

import { Button, Command } from '@/components/ui'
import { useMediaQuery } from '@/lib/utils'

export default function CommandBasicDemo() {
    const [open, setOpen] = useState(false)
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'j') {
                e.preventDefault()
                setOpen((open: boolean) => !open)
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const isDesktop = useMediaQuery('(min-width: 1024px)')
    return (
        <>
            <Button
                onPress={() => setOpen((open: boolean) => !open)}
                variant='outline'
                aria-label='Open command'
            >
                Press <kbd className='rounded border px-2 py-1 text-xs'>⌘J</kbd>
            </Button>
            <Command isOpen={open} onOpenChange={setOpen}>
                <Command.Input autoFocus={isDesktop} placeholder='Search Item' />
                <Command.List>
                    <Command.Empty>No results found.</Command.Empty>
                    <Command.Section heading='First Section'>
                        <Command.Item>First</Command.Item>
                        <Command.Item>Second</Command.Item>
                        <Command.Item>Third</Command.Item>
                    </Command.Section>
                    <Command.Separator />
                    <Command.Section heading='Second Section'>
                        <Command.Item>Fourth</Command.Item>
                        <Command.Item>Fifth</Command.Item>
                        <Command.Item>Sixth</Command.Item>
                    </Command.Section>
                </Command.List>
            </Command>
        </>
    )
}
