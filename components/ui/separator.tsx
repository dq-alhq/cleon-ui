'use client'

import {
    Separator as SeparatorPrimitive,
    type SeparatorProps
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

const separatorStyles = tv({
    base: 'bg-muted shrink-0 forced-colors:bg-[ButtonBorder]',
    variants: {
        orientation: {
            horizontal: 'h-px w-full',
            vertical: 'w-px'
        }
    },
    defaultVariants: {
        orientation: 'horizontal'
    }
})

const Separator = ({ className, ...props }: SeparatorProps) => (
    <SeparatorPrimitive
        {...props}
        className={separatorStyles({
            orientation: props.orientation,
            className: className
        })}
    />
)

export { Separator, type SeparatorProps }
