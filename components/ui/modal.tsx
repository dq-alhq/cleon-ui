'use client'

import * as React from 'react'
import {
    Button as ButtonPrimitive,
    composeRenderProps,
    DialogTrigger as DialogTriggerPrimitive,
    ModalOverlay as ModalOverlayPrimitive,
    Modal as ModalPrimitive,
    type DialogProps,
    type DialogTriggerProps,
    type ModalOverlayProps as ModalOverlayPrimitiveProps
} from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'

import { Dialog } from './dialog'

const ModalTrigger = ButtonPrimitive
const ModalHeader = Dialog.Header
const ModalTitle = Dialog.Title
const ModalDescription = Dialog.Description
const ModalFooter = Dialog.Footer
const ModalBody = Dialog.Body
const ModalClose = Dialog.Close

interface ModalSubComponents {
    Body: typeof ModalBody
    Close: typeof ModalClose
    Content: typeof ModalContent
    Description: typeof ModalDescription
    Footer: typeof ModalFooter
    Header: typeof ModalHeader
    Title: typeof ModalTitle
    Trigger: typeof ModalTrigger
}
const Modal: React.FC<DialogTriggerProps> & ModalSubComponents = (props) => (
    <DialogTriggerPrimitive {...props} />
)

const modalOverlayStyles = tv({
    base: [
        'fixed left-0 top-0 isolate z-50 h-[--visual-viewport-height] w-full',
        'flex items-end text-center sm:items-center sm:justify-center',
        '[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]'
    ],
    variants: {
        isBlurred: {
            true: 'backdrop-blur',
            false: 'bg-black/15 dark:bg-black/40'
        },
        isEntering: {
            true: 'ease-out animate-in fade-in'
        },
        isExiting: {
            true: 'duration-200 ease-in animate-out fade-out'
        }
    }
})
const modalContentStyles = tv({
    base: [
        'max-h-full rounded-t-2xl sm:rounded-lg overflow-hidden bg-background text-foreground text-left align-middle shadow-lg',
        'ring-1 ring-zinc-950/5 dark:ring-white/15',
        'w-full'
    ],
    variants: {
        isEntering: {
            true: [
                'animate-in duration-200 fade-in-0 slide-in-from-bottom-1/2',
                'sm:slide-in-from-bottom-auto sm:slide-in-from-top-[20%]'
            ]
        },
        isExiting: {
            true: [
                'duration-200 ease-in animate-out slide-out-to-bottom ',
                'sm:exiting:slide-out-to-top-[10%]'
            ]
        },
        size: {
            xs: 'sm:max-w-xs',
            sm: 'sm:max-w-sm',
            md: 'sm:max-w-md',
            lg: 'sm:max-w-lg sm:has-[[role=alertdialog]]:max-w-lg sm:has-[[role=dialog]]:max-w-lg',
            xl: 'sm:max-w-xl',
            '2xl': 'sm:max-w-2xl',
            '3xl': 'sm:max-w-3xl',
            '4xl': 'sm:max-w-4xl',
            '5xl': 'sm:max-w-5xl'
        }
    },
    defaultVariants: {
        size: 'lg'
    }
})

interface ModalContentProps
    extends Omit<React.ComponentProps<typeof Modal>, 'children'>,
        Omit<ModalOverlayPrimitiveProps, 'className'>,
        VariantProps<typeof modalContentStyles> {
    'aria-label'?: DialogProps['aria-label']
    'aria-labelledby'?: DialogProps['aria-labelledby']
    role?: DialogProps['role']
    closeButton?: boolean
    isBlurred?: boolean
    classNames?: {
        overlay?: ModalOverlayPrimitiveProps['className']
        content?: ModalOverlayPrimitiveProps['className']
    }
}

const ModalContent = ({
    classNames,
    isDismissable = true,
    isBlurred = true,
    children,
    size,
    role,
    closeButton = true,
    ...props
}: ModalContentProps) => {
    const _isDismissable = role === 'alertdialog' ? false : isDismissable
    return (
        <ModalOverlayPrimitive
            isDismissable={_isDismissable}
            className={composeRenderProps(
                classNames?.overlay,
                (className, renderProps) => {
                    return modalOverlayStyles({
                        ...renderProps,
                        isBlurred,
                        className
                    })
                }
            )}
            {...props}
        >
            <ModalPrimitive
                className={composeRenderProps(
                    classNames?.content,
                    (className, renderProps) =>
                        modalContentStyles({
                            ...renderProps,
                            size,
                            className
                        })
                )}
                {...props}
            >
                <Dialog role={role}>
                    {({ close }) => (
                        <>
                            {children}
                            {closeButton && (
                                <Dialog.CloseIndicator
                                    close={close}
                                    isDismissable={_isDismissable}
                                />
                            )}
                        </>
                    )}
                </Dialog>
            </ModalPrimitive>
        </ModalOverlayPrimitive>
    )
}

Modal.Body = ModalBody
Modal.Close = ModalClose
Modal.Content = ModalContent
Modal.Description = ModalDescription
Modal.Footer = ModalFooter
Modal.Header = ModalHeader
Modal.Title = ModalTitle
Modal.Trigger = ModalTrigger

export { Modal, modalContentStyles, modalOverlayStyles, type ModalContentProps }
