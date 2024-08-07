'use client'

import {
    composeRenderProps,
    Link as LinkPrimitive,
    type LinkProps as LinkPrimitiveProps
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

const linkStyles = tv({
    base: 'forced-colors:outline-[Highlight] focus-visible:outline-2 outline outline-offset-2 disabled:focus-visible:outline-0 outline-0 outline-primary rounded disabled:opacity-60 forced-colors:disabled:text-[GrayText] border-transparent transition-colors disabled:cursor-default',
    variants: {
        variant: {
            unstyled: 'text-foreground',
            primary:
                'text-primary hover:brightness-90 forced-colors:disabled:text-[GrayText]',
            danger: 'text-danger hover:brightness-90 forced-colors:disabled:text-[GrayText]',
            secondary:
                'text-secondary hover:brightness-90 forced-colors:disabled:text-[GrayText]'
        }
    },
    defaultVariants: {
        variant: 'unstyled'
    }
})

interface LinkProps extends LinkPrimitiveProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'unstyled'
}

const Link = ({ className, ...props }: LinkProps) => {
    return (
        <LinkPrimitive
            aria-label={props['aria-label'] ?? 'Link'}
            {...props}
            className={composeRenderProps(className, (className, ...renderProps) =>
                linkStyles({ ...renderProps, variant: props.variant, className })
            )}
        />
    )
}

export { Link, type LinkProps }
