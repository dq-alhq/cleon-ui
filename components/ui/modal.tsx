'use client'

import * as React from 'react'

import * as Primitive from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'

import { Dialog } from './dialog'

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

const modalOverlayStyles = tv({
    base: [
        'fixed left-0 top-0 isolate z-50 h-[--visual-viewport-height] w-full',
        'flex items-end text-center sm:items-center sm:justify-center',
        '[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]',
        'backdrop-blur-sm bg-black/40'
    ],
    variants: {
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
        'max-h-full w-full rounded-t-2xl sm:rounded-lg overflow-hidden bg-background text-foreground text-left align-middle shadow-lg',
        'ring-1 ring-background/30',
        'w-full'
    ],
    variants: {
        isEntering: {
            true: [
                'duration-150 animate-in ease-out fade-in-0 slide-in-from-bottom-1/2',
                'sm:slide-in-from-bottom-auto sm:slide-in-from-top-[15%] sm:zoom-in-95'
            ]
        },
        isExiting: {
            true: [
                'duration-150 ease-in animate-out fade-out-0 slide-out-to-bottom-1/2',
                'sm:slide-out-to-top-[15%] sm:zoom-out-95'
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

const Modal: React.FC<Primitive.DialogTriggerProps> & ModalSubComponents = (props) => (
    <Primitive.DialogTrigger {...props} />
)

const ModalTrigger = Primitive.Button
const ModalHeader = Dialog.Header
const ModalTitle = Dialog.Title
const ModalDescription = Dialog.Description
const ModalFooter = Dialog.Footer
const ModalBody = Dialog.Body
const ModalClose = Dialog.Close

interface ModalContentProps
    extends Omit<React.ComponentProps<typeof Modal>, 'children'>,
        Omit<Primitive.ModalOverlayProps, 'className'>,
        VariantProps<typeof modalContentStyles> {
    'aria-label'?: Primitive.DialogProps['aria-label']
    'aria-labelledby'?: Primitive.DialogProps['aria-labelledby']
    role?: Primitive.DialogProps['role']
    closeButton?: boolean
    classNames?: {
        overlay?: Primitive.ModalOverlayProps['className']
        content?: Primitive.ModalOverlayProps['className']
    }
}

const ModalContent = ({
    classNames,
    isDismissable = true,
    children,
    size,
    role,
    closeButton = true,
    ...props
}: ModalContentProps) => {
    const _isDismissable = role === 'alertdialog' ? false : isDismissable
    return (
        <Primitive.ModalOverlay
            isDismissable={_isDismissable}
            className={Primitive.composeRenderProps(
                classNames?.overlay,
                (className, renderProps) => {
                    return modalOverlayStyles({
                        ...renderProps,
                        className
                    })
                }
            )}
            {...props}
        >
            <Primitive.Modal
                className={Primitive.composeRenderProps(
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
            </Primitive.Modal>
        </Primitive.ModalOverlay>
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
