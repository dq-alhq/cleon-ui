'use client'

import {
    composeRenderProps,
    ToggleButton as ToggleButtonPrimitive,
    type ToggleButtonProps
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

const toggleStyles = tv({
    base: [
        'inline-flex items-center bg-transparent justify-center border border-transparent rounded-lg text-sm font-medium ring-offset-background transition-colors',
        'hover:bg-muted hover:text-muted-foreground'
    ],
    variants: {
        isDisabled: {
            true: 'opacity-50 cursor-default forced-colors:border-[GrayText]'
        },
        variant: {
            plain: 'selected:bg-secondary selected:text-secondary-foreground',
            solid: 'bg-white border-border hover:border-primary selected:border-primary hover:bg-primary hover:text-primary-foreground text-zinc-900 selected:bg-primary selected:text-primary-foreground',
            outline:
                'border-border selected:bg-secondary selected:backdrop-blur-sm selected:text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground'
        },
        size: {
            md: 'h-10 px-3',
            sm: 'h-9 px-2.5',
            lg: 'h-11 px-5',
            icon: 'size-10 shrink-0'
        },
        shape: {
            square: 'rounded-lg',
            circle: 'rounded-full'
        }
    },
    defaultVariants: {
        intent: 'transparent',
        size: 'md',
        shape: 'square'
    }
})

interface ToggleProps extends ToggleButtonProps {
    variant?: 'plain' | 'solid' | 'outline'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    shape?: 'square' | 'circle'
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
