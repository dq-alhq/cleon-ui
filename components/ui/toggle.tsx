'use client'

import {
    composeRenderProps,
    ToggleButton as ToggleButtonPrimitive,
    type ToggleButtonProps
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { type ButtonProps } from './button'

const toggleStyles = tv({
    base: [
        'relative whitespace-nowrap outline-none transition no-underline isolate inline-flex items-center justify-center gap-x-2 font-medium',
        '[&_svg]:size-4 [&_svg]:shrink-0',
        'disabled:cursor-default disabled:opacity-50'
    ],
    variants: {
        isDisabled: {
            true: 'opacity-50 cursor-default forced-colors:border-[GrayText]'
        },
        variant: {
            primary:
                'border bg-background text-foreground selected:bg-primary selected:text-primary-foreground pressed:ring pressed:ring-primary/40 shadow-sm',
            secondary:
                'border bg-background text-foreground selected:bg-secondary selected:text-secondary-foreground pressed:ring pressed:ring-secondary/40 shadow-sm',
            danger: 'border bg-background text-foreground selected:bg-danger selected:text-danger-foreground pressed:ring pressed:ring-danger/40 shadow-sm',
            success:
                'border bg-background text-foreground selected:bg-success selected:text-success-foreground pressed:ring pressed:ring-success/40 shadow-sm',
            info: 'border bg-background text-foreground selected:bg-info selected:text-info-foreground pressed:ring pressed:ring-info/40 shadow-sm',
            warning:
                'border bg-background text-foreground selected:bg-warning selected:text-warning-foreground pressed:ring pressed:ring-warning/40 shadow-sm',
            dark: 'border bg-background text-foreground selected:bg-dark selected:text-dark-foreground pressed:ring pressed:ring-dark/40 shadow-sm',
            outline:
                'border bg-background selected:bg-muted text-foreground shadow-sm hover:bg-muted pressed:bg-muted',
            ghost: 'text-foreground selected:bg-muted bg-transparent hover:bg-muted pressed:bg-muted'
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
        variant: 'outline',
        size: 'md',
        shape: 'square'
    }
})

interface ToggleProps extends ToggleButtonProps {
    variant?: ButtonProps['variant']
    size?: ButtonProps['size']
    shape?: ButtonProps['shape']
}

const Toggle = ({ className, ...props }: ToggleProps) => {
    return (
        <ToggleButtonPrimitive
            {...props}
            className={composeRenderProps(className, (className, renderProps) =>
                toggleStyles({
                    ...renderProps,
                    variant: props.variant,
                    size: props.size,
                    shape: props.shape,
                    className
                })
            )}
        />
    )
}

export { Toggle, toggleStyles, type ToggleProps }
