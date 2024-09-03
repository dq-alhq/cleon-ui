'use client'

import * as React from 'react'

import { IconCheck, IconClipboard } from 'cleon-icons'
import { AnimatePresence, m, motion } from 'framer-motion'
import { toast } from 'sonner'

import { cn, wait } from '@/lib/utils'

import { Button, type ButtonProps } from './button'

interface SnippetProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string
}

const Snippet: React.FC<SnippetProps> = ({ className, text, ...props }) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            wait(2000).then(() => setCopied(false))
        } else {
            toast.error('Failed to copy to clipboard')
        }
    }

    return (
        <div
            {...props}
            className={cn(
                'relative flex items-center justify-between text-zinc-200 rounded-lg border bg-zinc-900 py-2.5 pl-3 pr-2.5 font-mono text-sm [&>svg]:transition [&_svg]:shrink-0',
                className
            )}
        >
            <span className='mr-6'>{text}</span>
            <Button
                className='size-7 border border-zinc-700 bg-zinc-800 text-white backdrop-blur-lg hover:bg-zinc-700'
                aria-label='Copy imports statement'
                size='icon'
                variant='ghost'
                onPress={handleCopy}
            >
                <AnimatePresence mode='wait' initial={false}>
                    {copied ? (
                        <motion.span
                            key='checkmark-import'
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <IconCheck />
                        </motion.span>
                    ) : (
                        <motion.span
                            key='copy'
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <IconClipboard />
                        </motion.span>
                    )}
                </AnimatePresence>
            </Button>
        </div>
    )
}

interface CopyButtonProps extends ButtonProps {
    isCopied?: boolean
    ariaLabel?: string
    initialIcon?: React.ReactNode
    copiedIcon?: React.ReactNode
}

const CopyButton = ({
    initialIcon,
    copiedIcon,
    ariaLabel = 'Copy',
    isCopied,
    ...props
}: CopyButtonProps) => {
    return (
        <Button
            className='size-7 border border-zinc-700 bg-zinc-800 text-white backdrop-blur-lg hover:bg-zinc-700'
            aria-label={ariaLabel}
            size='icon'
            variant='ghost'
            {...props}
        >
            <AnimatePresence mode='wait' initial={false}>
                {isCopied ? (
                    <m.span
                        key='checkmark-import'
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {copiedIcon ?? <IconCheck />}
                    </m.span>
                ) : (
                    <m.span
                        key='copy'
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {initialIcon ?? <IconClipboard />}
                    </m.span>
                )}
            </AnimatePresence>
        </Button>
    )
}

export { CopyButton, Snippet, type SnippetProps }
