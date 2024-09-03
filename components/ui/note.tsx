'use client'

import * as React from 'react'

import { IconAlertCircle, IconAlertTriangle, IconCircleCheck } from 'cleon-icons'
import { Text } from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const noteStyles = tv({
    base: [
        'my-4 px-5 py-4 overflow-hidden rounded-xl border [&_strong]:font-medium',
        '[&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0'
    ],
    variants: {
        variant: {
            primary: [
                'border-primary/20 [&_a]:text-primary text-primary bg-primary/10 [&_[data-slot=icon]]:text-primary leading-4'
            ],
            secondary: [
                'border-foreground/20 [&_a]:text-foreground text-foreground bg-secondary/20 [&_[data-slot=icon]]:text-foreground leading-4'
            ],
            info: [
                'border-info/20 [&_a]:text-info text-info bg-info/10 [&_[data-slot=icon]]:text-info leading-4'
            ],
            warning: [
                'border-warning/20 [&_a]:text-warning text-warning bg-warning/10 [&_[data-slot=icon]]:text-warning leading-4'
            ],
            danger: [
                'border-danger/20 [&_a]:text-danger text-danger bg-danger/10 [&_[data-slot=icon]]:text-danger leading-4'
            ],
            success: [
                'border-success/20 [&_a]:text-success text-success bg-success/10 [&_[data-slot=icon]]:text-success leading-4'
            ]
        }
    },
    defaultVariants: {
        variant: 'primary'
    }
})

interface NoteProps
    extends React.HtmlHTMLAttributes<HTMLDivElement>,
        VariantProps<typeof noteStyles> {}

const Note = ({ variant = 'secondary', className, ...props }: NoteProps) => {
    return (
        <div className={noteStyles({ variant, className })} {...props}>
            <div className='flex items-start gap-x-3'>
                <div className='mt-0.5 w-5'>
                    {['info', 'primary', 'secondary'].includes(variant) ? (
                        <IconAlertCircle />
                    ) : variant === 'success' ? (
                        <IconCircleCheck />
                    ) : (
                        <IconAlertTriangle />
                    )}
                </div>
                <Text
                    slot='description'
                    {...props}
                    className={cn('text-sm block', className)}
                >
                    {props.children}
                </Text>
            </div>
        </div>
    )
}

export { Note, type NoteProps }
