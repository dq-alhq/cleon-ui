'use client'

import {
    composeRenderProps,
    ToggleButton as ToggleButtonPrimitive,
    type ToggleButtonProps
} from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'

const toggleStyles = tv({
    base: [
        'inline-flex gap-x-2 whitespace-nowrap relative items-center bg-transparent focus:outline-none justify-center border text-sm font-medium ring-offset-bg transition-colors hover:bg-muted'
    ],
    variants: {
        isDisabled: {
            true: 'opacity-50 cursor-default forced-colors:border-[GrayText]'
        },
        variant: {
            solid: 'bg-white border-border selected:border-primary hover:text-black text-black selected:bg-primary selected:text-primary-foreground',
            outline:
                'border-border selected:bg-muted selected:backdrop-blur-sm hover:bg-muted hover:brightness-110',
            ghost: 'selected:bg-muted border-transparent selected:text-muted-foreground'
        },
        size: {
            xs: 'h-8 px-2 text-xs',
            sm: 'h-9 px-3 text-sm',
            md: 'h-10 px-4 py-2 text-sm',
            lg: 'h-10 sm:h-11 px-6 sm:px-8 text-base',
            icon: 'size-10 shrink-0'
        },
        shape: {
            square: 'rounded-lg',
            circle: 'rounded-full'
        }
    },
    defaultVariants: {
        size: 'md',
        shape: 'square'
    }
})

type ToggleProps = ToggleButtonProps & VariantProps<typeof toggleStyles>

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
        >
            {composeRenderProps(props.children, (children) => (
                <TouchTarget>{children}</TouchTarget>
            ))}
        </ToggleButtonPrimitive>
    )
}

const TouchTarget = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <span
                className='absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden'
                aria-hidden='true'
            />
            {children}
        </>
    )
}

export { Toggle, toggleStyles, type ToggleProps }
