'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import {
    Button as ButtonPrimitive,
    type ButtonProps as ButtonPrimitiveProps
} from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
    base: [
        'btn relative outline-none transition no-underline isolate inline-flex items-center justify-center gap-x-2 font-medium hover:brightness-110 pressed:brightness-90',
        '[&_svg]:size-4 [&_svg]:shrink-0',
        'disabled:cursor-default disabled:opacity-50'
    ],
    variants: {
        variant: {
            primary:
                'bg-primary text-primary-foreground pressed:ring pressed:ring-primary/40 shadow-sm',
            secondary:
                'bg-secondary text-secondary-foreground pressed:ring pressed:ring-secondary/40 shadow-sm',
            danger: 'bg-danger text-danger-foreground pressed:ring pressed:ring-danger/40 shadow-sm',
            success:
                'bg-success text-success-foreground pressed:ring pressed:ring-success/40 shadow-sm',
            info: 'bg-info text-info-foreground pressed:ring pressed:ring-info/40 shadow-sm',
            warning:
                'bg-warning text-warning-foreground pressed:ring pressed:ring-warning/40 shadow-sm',
            dark: 'bg-dark text-dark-foreground pressed:ring pressed:ring-dark/40 shadow-sm',
            outline:
                'border bg-background text-foreground shadow-sm hover:bg-muted-foreground pressed:bg-muted',
            ghost: 'text-foreground bg-transparent hover:bg-muted pressed:bg-muted-foreground'
        },
        size: {
            xs: 'h-8 px-2 text-xs',
            sm: 'h-9 px-3 text-sm',
            md: 'h-10 px-4 py-2 text-sm',
            lg: 'h-10 sm:h-11 px-6 sm:px-8 text-base',
            icon: 'size-9 sm:size-10 shrink-0'
        },
        shape: {
            square: 'rounded-lg',
            circle: 'rounded-full'
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
