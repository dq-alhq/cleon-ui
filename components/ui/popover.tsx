'use client'

import * as React from 'react'

import { cn, useMediaQuery } from '@/lib/utils'
import * as Primitive from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'
import { Dialog, type TitleProps } from './dialog'

interface PopoverSubComponents {
    Content: typeof PopoverContent
    Trigger: typeof PopoverTrigger
    Close: typeof PopoverClose
    Footer: typeof PopoverFooter
    Header: typeof PopoverHeader
    Title: typeof PopoverTitle
    Description: typeof PopoverDescription
    Body: typeof PopoverBody
    Picker: typeof PopoverPicker
}

type PopoverComponent = React.FC<Primitive.DialogTriggerProps> & PopoverSubComponents

const Popover: PopoverComponent = (props) => {
    return <Primitive.DialogTrigger {...props} />
}
const PopoverTrigger = Primitive.Button
const PopoverClose = Dialog.Close
const PopoverDescription = Dialog.Description

const PopoverTitle = ({ className, ...props }: TitleProps) => (
    <Dialog.Title className={cn('leading-none', className)} {...props} />
)

const PopoverHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <Dialog.Header className={cn('p-0', className)} {...props} />
)

const PopoverFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <Dialog.Footer className={cn('pt-4 pb-0', className)} {...props} />
)

const PopoverBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <Dialog.Body className={cn('p-0', className)} {...props} />
)

const popoverContentStyles = tv({
    base: [
        'max-w-xs min-w-80 p-4 rounded-lg border bg-background bg-clip-padding text-foreground shadow-lg dark:backdrop-blur-2xl dark:backdrop-saturate-200 lg:text-sm sm:max-w-3xl'
    ],
    variants: {
        isEntering: {
            true: [
                'duration-200 ease-out animate-in fade-in lg:placement-left:slide-in-from-right-1 lg:placement-right:slide-in-from-left-1 lg:placement-top:slide-in-from-bottom-1 lg:placement-bottom:slide-in-from-top-1'
            ]
        },
        isExiting: {
            true: 'duration-150 ease-in animate-out fade-out placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1'
        }
    }
})

const drawerStyles = tv({
    base: [
        'fixed bottom-0 p-4 top-auto z-50 w-full bg-background max-w-2xl rounded-t-xl border border-b-transparent outline-none',
        'entering:animate-in entering:fade-in-0 entering:slide-in-from-bottom-1/2 entering:[transition-timing-function:ease-out',
        'exiting:animate-out exiting:fade-out-0 exiting:slide-out-to-bottom-1/2 exiting:[transition-timing-function:ease]'
    ]
})

interface PopoverProps
    extends Omit<Primitive.DialogProps, 'children' | 'className' | 'style'>,
        Omit<Primitive.PopoverProps, 'children' | 'className'>,
        Omit<VariantProps<typeof drawerStyles>, 'className'> {
    className?:
        | string
        | Primitive.DialogProps['className']
        | Primitive.PopoverProps['className']
    children: React.ReactNode
    showArrow?: boolean
    style?: React.CSSProperties
}

const PopoverContent = ({
    children,
    showArrow = true,
    className,
    ...props
}: PopoverProps) => {
    const popoverContext = Primitive.useSlottedContext(Primitive.PopoverContext)!
    const isSubmenu = popoverContext?.trigger === 'SubmenuTrigger'
    let offset = showArrow ? 12 : 8
    offset = isSubmenu ? offset - 6 : offset
    const isMobile = useMediaQuery('(max-width: 600px)')
    return isMobile ? (
        <Primitive.Modal
            {...props}
            isDismissable
            className={cn(drawerStyles(), className)}
        >
            <Dialog className='focus:outline-none'>{children}</Dialog>
        </Primitive.Modal>
    ) : (
        <Primitive.Popover
            offset={offset}
            {...props}
            className={Primitive.composeRenderProps(className, (className, renderProps) =>
                popoverContentStyles({
                    ...renderProps,
                    className
                })
            )}
        >
            {showArrow && (
                <Primitive.OverlayArrow className='group'>
                    <svg
                        width={12}
                        height={12}
                        viewBox='0 0 12 12'
                        className='block fill-background stroke-border group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180'
                    >
                        <path d='M0 0 L6 6 L12 0' />
                    </svg>
                </Primitive.OverlayArrow>
            )}
            {children}
        </Primitive.Popover>
    )
}

const PopoverPicker = ({ children, className, ...props }: PopoverProps) => {
    return (
        <Primitive.Popover
            {...props}
            className={Primitive.composeRenderProps(className, (className, renderProps) =>
                popoverContentStyles({
                    ...renderProps,
                    className: cn(
                        'max-h-72 overflow-y-auto min-w-[--trigger-width] p-0',
                        className
                    )
                })
            )}
        >
            {children}
        </Primitive.Popover>
    )
}

Popover.Body = PopoverBody
Popover.Close = PopoverClose
Popover.Content = PopoverContent
Popover.Description = PopoverDescription
Popover.Footer = PopoverFooter
Popover.Header = PopoverHeader
Popover.Picker = PopoverPicker
Popover.Title = PopoverTitle
Popover.Trigger = PopoverTrigger

export { Popover }
