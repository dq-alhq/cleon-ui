'use client'
import { getCategoryIcon, unicodeToEmoji } from '@/lib/emoji'
import emojis from '@/lib/emoji.json'
import { cn } from '@/lib/utils'
import { SmileIcon } from 'lucide-react'
import React from 'react'
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
                <SmileIcon />
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
