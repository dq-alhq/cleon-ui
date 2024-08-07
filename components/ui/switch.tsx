'use client'

import {
    Switch as SwitchPrimitive,
    type SwitchProps as SwitchPrimitiveProps
} from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const trackStyles = tv({
    base: 'mr-2 h-5 w-8 cursor-pointer rounded-full border-2 border-transparent bg-muted transition duration-200',
    variants: {
        variant: {
            primary: 'group-selected:bg-primary',
            secondary: 'group-selected:bg-secondary',
            success: 'group-selected:bg-success',
            danger: 'group-selected:bg-danger',
            warning: 'group-selected:bg-warning',
            info: 'group-selected:bg-info'
        }
    },
    defaultVariants: {
        variant: 'primary'
    }
})

interface SwitchProps extends SwitchPrimitiveProps, VariantProps<typeof trackStyles> {}

const Switch = ({ children, variant, className, ...props }: SwitchProps) => {
    return (
        <SwitchPrimitive
            {...props}
            className={(values) =>
                cn(
                    'group inline-flex touch-none lg:text-sm items-center disabled:opacity-60 forced-colors:disabled:text-[GrayText]',
                    typeof className === 'function' ? className(values) : className
                )
            }
            style={{ WebkitTapHighlightColor: 'transparent' }}
        >
            {(values) => (
                <>
                    <span className={trackStyles({ variant })}>
                        <span className='forced-colors:disabled:outline-[GrayText] group-selected:ml-3 group-selected:group-data-[pressed]:ml-2 group-pressed:w-5 block size-4 origin-right rounded-full bg-white shadow transition-all duration-200' />
                    </span>
                    {typeof children === 'function' ? children(values) : children}
                </>
            )}
        </SwitchPrimitive>
    )
}

export { Switch }
