'use client'

import * as React from 'react'

import {
    Button as ButtonPrimitive,
    type ButtonProps as ButtonPrimitiveProps
} from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const buttonVariants = tv({
    base: [
        'btn relative border before:absolute after:absolute box-border whitespace-nowrap outline-none transition-all duration-200 no-underline isolate inline-flex items-center justify-center gap-x-2 font-medium',
        'pressed:brightness-95',
        '[&_svg]:size-4 [&_svg]:shrink-0 forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText] [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-1 [&>[data-slot=icon]]:size-4 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon]',
        'disabled:cursor-default disabled:opacity-50',
        'border-transparent bg-[--btn-border]',
        'before:inset-0 before:-z-10 before:bg-[--btn-bg] before:shadow before:data-[disabled]:shadow-none',
        'after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:active:bg-[--btn-hover-overlay] after:hover:bg-[--btn-hover-overlay] after:data-[disabled]:shadow-none after:inset-0 after:-z-10',
        'dark:after:-inset-px dark:before:hidden dark:border-white/5 dark:bg-[--btn-bg]'
    ],
    variants: {
        variant: {
            primary: [
                'text-primary-foreground [--btn-bg:theme(colors.primary.DEFAULT)] [--btn-border:theme(colors.primary.DEFAULT)] [--btn-hover-overlay:theme(colors.white/10%)]',
                '[--btn-icon:theme(colors.primary.foreground/90%)] active:[--btn-icon:theme(colors.primary.foreground)] hover:[--btn-icon:theme(colors.primary.foreground)]'
            ],
            secondary: [
                'text-secondary-foreground [--btn-bg:theme(colors.secondary.DEFAULT)] [--btn-border:theme(colors.secondary.DEFAULT)] [--btn-hover-overlay:theme(colors.white/10%)]',
                '[--btn-icon:theme(colors.secondary.foreground/90%)] active:[--btn-icon:theme(colors.secondary.foreground)] hover:[--btn-icon:theme(colors.secondary.foreground)]'
            ],
            danger: [
                'text-danger-foreground [--btn-bg:theme(colors.danger.DEFAULT)] [--btn-border:theme(colors.danger.DEFAULT)] [--btn-hover-overlay:theme(colors.white/10%)]',
                '[--btn-icon:theme(colors.danger.foreground/90%)] active:[--btn-icon:theme(colors.danger.foreground)] hover:[--btn-icon:theme(colors.danger.foreground)]'
            ],
            success: [
                'text-success-foreground [--btn-bg:theme(colors.success.DEFAULT)] [--btn-border:theme(colors.success.DEFAULT)] [--btn-hover-overlay:theme(colors.white/10%)]',
                '[--btn-icon:theme(colors.success.foreground/90%)] active:[--btn-icon:theme(colors.success.foreground)] hover:[--btn-icon:theme(colors.success.foreground)]'
            ],
            info: [
                'text-info-foreground [--btn-bg:theme(colors.info.DEFAULT)] [--btn-border:theme(colors.info.DEFAULT)] [--btn-hover-overlay:theme(colors.white/10%)]',
                '[--btn-icon:theme(colors.info.foreground/90%)] active:[--btn-icon:theme(colors.info.foreground)] hover:[--btn-icon:theme(colors.info.foreground)]'
            ],
            warning: [
                'text-warning-foreground [--btn-bg:theme(colors.warning.DEFAULT)] [--btn-border:theme(colors.warning.DEFAULT)] [--btn-hover-overlay:theme(colors.white/10%)]',
                '[--btn-icon:theme(colors.warning.foreground/90%)] active:[--btn-icon:theme(colors.warning.foreground)] hover:[--btn-icon:theme(colors.warning.foreground)]'
            ],
            dark: [
                'text-dark-foreground [--btn-bg:theme(colors.dark.DEFAULT)] [--btn-border:theme(colors.dark.DEFAULT)] [--btn-hover-overlay:theme(colors.white/10%)]',
                '[--btn-icon:theme(colors.dark.foreground/90%)] active:[--btn-icon:theme(colors.dark.foreground)] hover:[--btn-icon:theme(colors.dark.foreground)]'
            ],
            muted: [
                'text-muted-foreground [--btn-bg:theme(colors.muted.DEFAULT)] [--btn-border:theme(colors.muted.DEFAULT)] [--btn-hover-overlay:theme(colors.white/10%)]',
                '[--btn-icon:theme(colors.muted.foreground/90%)] active:[--btn-icon:theme(colors.muted.foreground)] hover:[--btn-icon:theme(colors.muted.foreground)]'
            ],
            outline: [
                'text-foreground bg-background/80 backdrop-blur-lg border-border dark:border-border [--btn-hover-overlay:theme(colors.muted.DEFAULT)]',
                '[--btn-icon:theme(colors.foreground)]',
                'dark:after:shadow-sm dark:before:shadow-sm'
            ],
            ghost: 'text-foreground bg-transparent hover:bg-muted shadow-none border-none after:shadow-none before:shadow-none'
        },
        size: {
            xs: 'h-8 px-2 text-xs',
            sm: 'h-9 px-3 text-sm',
            md: 'h-10 px-4 py-2 text-sm',
            lg: 'h-10 sm:h-11 px-6 sm:px-8 text-base',
            icon: 'size-10 shrink-0'
        },
        shape: {
            square: 'rounded-lg before:rounded-[calc(theme(borderRadius.lg)-1px)] after:rounded-[calc(theme(borderRadius.lg)-1px)] dark:after:rounded-lg',
            circle: 'rounded-[9999px] before:rounded-[9998px] after:rounded-[9998px] dark:after:rounded-[9999px]'
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
        shape: 'square'
    }
})

export interface ButtonProps
    extends ButtonPrimitiveProps,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, shape, ...props }, ref) => {
        return (
            <ButtonPrimitive
                className={(values) =>
                    cn(
                        buttonVariants({
                            variant,
                            size,
                            shape,
                            className:
                                typeof className === 'function'
                                    ? className(values)
                                    : className
                        })
                    )
                }
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
