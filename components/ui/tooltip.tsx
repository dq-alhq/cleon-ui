'use client'

import React from 'react'

import {
    Button,
    composeRenderProps,
    OverlayArrow,
    Tooltip as TooltipPrimitive,
    type TooltipProps as TooltipPrimitiveProps,
    type TooltipTriggerComponentProps,
    TooltipTrigger as TooltipTriggerPrimitive
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

export interface TooltipProps extends Omit<TooltipPrimitiveProps, 'children'> {
    children: React.ReactNode
}

const tooltipStyles = tv({
    base: [
        'group rounded-md [&_strong]:font-medium bg-foreground border border-foreground text-background px-2 py-1.5 text-sm will-change-transform dark:shadow-none',
        'placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1'
    ],
    variants: {
        isEntering: {
            true: 'animate-in fade-in'
        },
        isExiting: {
            true: 'animate-in fade-in direction-reverse'
        }
    }
})
const Tooltip = (props: TooltipTriggerComponentProps) => {
    return <TooltipTriggerPrimitive {...props} />
}
const TooltipTrigger = Button

const TooltipContent = ({ children, ...props }: TooltipProps) => {
    return (
        <TooltipPrimitive
            {...props}
            offset={10}
            className={composeRenderProps(props.className, (className, renderProps) =>
                tooltipStyles({
                    ...renderProps,
                    className
                })
            )}
        >
            <OverlayArrow>
                <svg
                    width={8}
                    height={8}
                    viewBox='0 0 8 8'
                    className='fill-foreground stroke-foreground group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]'
                >
                    <path d='M0 0 L4 4 L8 0' />
                </svg>
            </OverlayArrow>
            {children}
        </TooltipPrimitive>
    )
}

Tooltip.Content = TooltipContent
Tooltip.Trigger = TooltipTrigger

export { Tooltip }
