'use client'

import * as React from 'react'

import {
    Button,
    composeRenderProps,
    Dialog as DialogPrimitive,
    DialogTrigger,
    Modal,
    ModalOverlay,
    OverlayArrow,
    PopoverContext,
    Popover as PopoverPrimitive,
    useSlottedContext,
    type DialogProps,
    type DialogTriggerProps,
    type ModalOverlayProps,
    type PopoverProps as PopoverPrimitiveProps
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cn, useMediaQuery } from '@/lib/utils'

import { Dialog, type DialogTitleProps } from './dialog'

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

type PopoverComponent = React.FC<DialogTriggerProps> & PopoverSubComponents

const Popover: PopoverComponent = (props) => {
    return <DialogTrigger {...props} />
}

const PopoverTrigger = Button
const PopoverClose = Dialog.Close
const PopoverDescription = Dialog.Description

const PopoverTitle = ({ className, ...props }: DialogTitleProps) => (
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
        'max-w-xs min-w-80 p-4 rounded-lg border bg-background bg-clip-padding dark:backdrop-blur-2xl dark:backdrop-saturate-200 text-foreground shadow-lg lg:text-sm sm:max-w-3xl forced-colors:bg-[Canvas]'
    ],
    variants: {
        isMenu: {
            true: {
                true: 'p-0'
            }
        },
        isEntering: {
            true: [
                'duration-50 ease-out animate-in fade-in placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1'
            ]
        },
        isExiting: {
            true: 'duration-50 ease-in animate-out fade-out placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1'
        }
    }
})

const drawerStyles = tv({
    base: [
        'fixed max-h-full bottom-0 p-4 top-auto z-50 w-full bg-background max-w-2xl rounded-t-xl border border-b-transparent outline-none'
    ],
    variants: {
        isMenu: {
            true: 'p-0'
        },
        isEntering: {
            true: 'animate-in fade-in-0 slide-in-from-bottom-1/2 [transition-timing-function:ease-out'
        },
        isExiting: {
            true: 'animate-out fade-out-0 slide-out-to-bottom-1/2 [transition-timing-function:ease]'
        }
    }
})

interface PopoverProps
    extends Omit<React.ComponentProps<typeof Modal>, 'children'>,
        Omit<PopoverPrimitiveProps, 'children' | 'className'>,
        ModalOverlayProps {
    children: React.ReactNode
    className?: string | ((values: any & { defaultClassName?: string }) => string)
    showArrow?: boolean
    style?: React.CSSProperties
    respectScreen?: boolean
    'aria-label'?: DialogProps['aria-label']
    'aria-labelledby'?: DialogProps['aria-labelledby']
}

const PopoverContent = ({
    respectScreen = true,
    children,
    showArrow,
    className,
    ...props
}: PopoverProps) => {
    const isMobile = useMediaQuery('(max-width: 600px)')
    const popoverContext = useSlottedContext(PopoverContext)!
    const isMenuTrigger = popoverContext?.trigger === 'MenuTrigger'
    const isSubmenuTrigger = popoverContext?.trigger === 'SubmenuTrigger'
    const isMenu = isMenuTrigger || isSubmenuTrigger
    let offset = showArrow ? 12 : 8
    offset = isSubmenuTrigger ? offset - 6 : offset

    return isMobile && respectScreen ? (
        <ModalOverlay
            className={cn(
                'fixed left-0 top-0 bg-background/10 isolate z-50 h-[--visual-viewport-height] w-full [--visual-viewport-vertical-padding:16px]',
                isSubmenuTrigger ? 'bg-background/10' : ''
            )}
            {...props}
            isDismissable
        >
            <Modal
                className={composeRenderProps(className, (className, renderProps) =>
                    drawerStyles({ ...renderProps, isMenu, className })
                )}
            >
                <DialogPrimitive
                    aria-label={isMenu ? 'Menu' : props['aria-label']}
                    className='focus:outline-none touch-none'
                >
                    {children}
                </DialogPrimitive>
            </Modal>
        </ModalOverlay>
    ) : (
        <PopoverPrimitive
            offset={offset}
            {...props}
            className={composeRenderProps(className, (className, renderProps) =>
                popoverContentStyles({
                    ...renderProps,
                    className
                })
            )}
        >
            {showArrow && (
                <OverlayArrow className='group'>
                    <svg
                        width={12}
                        height={12}
                        viewBox='0 0 12 12'
                        className='block fill-background stroke-border group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]'
                    >
                        <path d='M0 0 L6 6 L12 0' />
                    </svg>
                </OverlayArrow>
            )}
            {children}
        </PopoverPrimitive>
    )
}

const PopoverPicker = ({ children, className, ...props }: PopoverProps) => {
    return (
        <PopoverPrimitive
            {...props}
            className={composeRenderProps(className, (className, renderProps) =>
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
        </PopoverPrimitive>
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

export { drawerStyles, Popover, popoverContentStyles }
