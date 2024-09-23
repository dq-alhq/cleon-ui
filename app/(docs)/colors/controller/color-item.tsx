'use client'

import React from 'react'

import { IconCheck, IconClipboard } from 'cleon-icons'
import { ListBoxItem, type ListBoxItemProps } from 'react-aria-components'
import { toast } from 'sonner'
import { copyToClipboard } from 'usemods'

import { isBrightColor } from '@/components/ui'
import { formatColorForTailwind, textForeground } from '@/lib/colors'
import { cn } from '@/lib/utils'
import { parseColor } from '@react-stately/color'
import type { ColorFormat } from '@react-types/color'

interface ColorItemProps extends ListBoxItemProps {
    item: {
        shade: string
        color: string
    }
    textColor?: string
    name: string
    selectedFormat: ColorFormat
    tailwindVariable: boolean
}

const ColorItem = ({
    item,
    textColor,
    name,
    selectedFormat,
    tailwindVariable
}: ColorItemProps) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async (selectedColor: string) => {
        const toCopy = tailwindVariable
            ? formatColorForTailwind(selectedColor)
            : selectedColor

        await copyToClipboard(toCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast(`Copy ${toCopy} to clipboard.`, {
            classNames: {
                toast: '[&:has([data-icon])_[data-content]]:!ml-0',
                icon: 'hidden'
            }
        })
    }
    return (
        <ListBoxItem
            textValue={name}
            className={cn(
                'w-full h-14 group focus:outline-none cursor-pointer rounded-lg relative',
                isBrightColor(item.color)
                    ? 'ring-1 ring-inset ring-black/10'
                    : 'dark:ring-1 dark:ring-inset dark:ring-white/10'
            )}
            onAction={() =>
                handleCopy(
                    parseColor(item.color as string)?.toString(
                        selectedFormat as ColorFormat
                    )
                )
            }
            style={{
                color: textColor ?? textForeground(item.color),
                backgroundColor: item.color
            }}
        >
            <span
                className={cn(
                    'group-hover:block hidden left-1/2 -translate-x-1/2 top-2 absolute',
                    copied && 'block'
                )}
            >
                {copied ? <IconCheck /> : <IconClipboard />}
            </span>
            <span className='text-xs left-1/2 -translate-x-1/2 bottom-2 absolute font-mono flex flex-col justify-center'>
                {item.shade}
            </span>
        </ListBoxItem>
    )
}

export { ColorItem }
