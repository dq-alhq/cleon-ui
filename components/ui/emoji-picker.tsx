'use client'

import * as React from 'react'

import { getCategoryIcon, unicodeToEmoji } from '@/lib/emoji'
import emojis from '@/lib/emoji.json'
import { cn } from '@/lib/utils'

import { Button } from './button'
import { Popover } from './popover'
import { Tabs } from './tabs'

interface Emoji {
    no: number
    code: string
    flagged: boolean
    keywords: string[]
    types?: string[]
}

interface EmojiPickerProps {
    onPickEmoji: (emoji: string) => void
    open: boolean
    setOpen: (open: boolean) => void
    className?: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
}

const EmojiPicker = ({
    open,
    setOpen,
    onPickEmoji,
    placement = 'top',
    className
}: EmojiPickerProps) => {
    const categories = Object.keys(emojis)

    const triggerRef = React.useRef(null)

    return (
        <>
            <Button
                className={cn(className)}
                variant='ghost'
                size='icon'
                onPress={() => setOpen(!open)}
                ref={triggerRef}
            >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                        fill='currentColor'
                        d='M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m3.5 6A1.5 1.5 0 0 1 17 9.5a1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 14 9.5A1.5 1.5 0 0 1 15.5 8m-7 0A1.5 1.5 0 0 1 10 9.5A1.5 1.5 0 0 1 8.5 11A1.5 1.5 0 0 1 7 9.5A1.5 1.5 0 0 1 8.5 8m3.5 9.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.81 2.04-2.78 3.5-5.11 3.5'
                    ></path>
                </svg>
            </Button>
            <Popover.Content
                placement={placement}
                showArrow
                aria-label='Emoji'
                isOpen={open}
                onOpenChange={setOpen}
                triggerRef={triggerRef}
            >
                <Tabs>
                    <Tabs.List>
                        {categories?.map((category: string, i: number) => (
                            <Tabs.Label
                                className='w-full flex justify-center'
                                id={category}
                                key={i}
                            >
                                {getCategoryIcon(category)}
                            </Tabs.Label>
                        ))}
                    </Tabs.List>
                    {categories.map((category: string, i: number) => (
                        <Tabs.Content
                            id={category}
                            key={i}
                            className='p-0 max-h-48 overflow-auto no-scrollbar'
                        >
                            <div className='grid grid-cols-8 w-full'>
                                {emojis[category as keyof typeof emojis].map(
                                    (emoji: Emoji, i: number) => (
                                        <Button
                                            key={i}
                                            variant='ghost'
                                            size='icon'
                                            className='p-2 size-7 sm:size-7 flex items-center justify-center text-center'
                                            onPress={() =>
                                                onPickEmoji(unicodeToEmoji(emoji.code))
                                            }
                                        >
                                            {unicodeToEmoji(emoji.code)}
                                        </Button>
                                    )
                                )}
                            </div>
                        </Tabs.Content>
                    ))}
                </Tabs>
            </Popover.Content>
        </>
    )
}
export { EmojiPicker, type EmojiPickerProps }
