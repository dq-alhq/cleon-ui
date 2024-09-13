'use client'

import React from 'react'

import type { PanInfo } from 'framer-motion'
import {
    animate,
    AnimatePresence,
    type Inertia,
    motion,
    useMotionTemplate,
    useMotionValue,
    useMotionValueEvent,
    useTransform
} from 'framer-motion'
import type { DialogProps } from 'react-aria-components'
import { type ButtonProps, Modal, ModalOverlay } from 'react-aria-components'

import { cn } from '@/lib/utils'

import { Dialog } from './dialog'

const inertiaTransition: Inertia = {
    type: 'inertia',
    bounceStiffness: 300,
    bounceDamping: 60,
    timeConstant: 300
}
const staticTransition = {
    duration: 0.4,
    ease: [0.32, 0.72, 0, 1]
}
const drawerMargin = 60
const drawerRadius = 32

interface DrawerContextType {
    isOpen: boolean
    openDrawer: () => void
    closeDrawer: () => void
    withNotch?: boolean
}

const DrawerContext = React.createContext<DrawerContextType | undefined>(undefined)

const useDrawerContext = () => {
    const context = React.useContext(DrawerContext)
    if (context === undefined) {
        throw new Error('useDrawerContext must be used within a Drawer')
    }
    return context
}

const ModalWrapper = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Modal>>(
    (props, ref) => <Modal ref={ref} {...props} />
)
ModalWrapper.displayName = 'ModalWrapper'

const ModalOverlayWrapper = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<typeof ModalOverlay>
>((props, ref) => <ModalOverlay ref={ref} {...props} />)
ModalOverlayWrapper.displayName = 'ModalOverlayWrapper'

const ModalPrimitive = motion.create(ModalWrapper)
const ModalOverlayPrimitive = motion.create(ModalOverlayWrapper)

interface DrawerOverlayPrimitiveProps
    extends Omit<
        React.ComponentProps<typeof ModalOverlayPrimitive>,
        'isOpen' | 'onOpenChange' | 'style'
    > {
    'aria-label'?: DialogProps['aria-label']
    'aria-labelledby'?: DialogProps['aria-labelledby']
    role?: DialogProps['role']
}

const DrawerContentPrimitive = ({ children, ...props }: DrawerOverlayPrimitiveProps) => {
    const { closeDrawer, withNotch } = useDrawerContext()
    const [contentHeight, setContentHeight] = React.useState(0)

    const h = Math.min(contentHeight + drawerMargin, window.innerHeight - drawerMargin)
    const y = useMotionValue(h)
    const bgOpacity = useTransform(y, [0, h], [0.15, 0])
    const bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`

    const root = document.getElementsByTagName('main')[0] as HTMLElement

    const bodyBorderRadius = useTransform(y, [0, h], [drawerRadius, 0])

    useMotionValueEvent(
        bodyBorderRadius,
        'change',
        (v) => (root.style.borderRadius = `${v}px`)
    )

    const onDragEnd = (_: any, { offset, velocity }: PanInfo) => {
        if (offset.y > h * 0.4 || velocity.y > 10) {
            closeDrawer()
        } else {
            animate(y, 0, { ...inertiaTransition, min: 0, max: 0 })
        }
    }

    return (
        <>
            <ModalOverlayPrimitive
                isDismissable
                isOpen
                onOpenChange={closeDrawer}
                className={cn([
                    'fixed touch-none will-change-transform left-0 top-0 isolate z-50 h-[--visual-viewport-height] w-full',
                    'flex items-end [--visual-viewport-vertical-padding:100px]'
                ])}
                style={{
                    backgroundColor: bg as any
                }}
            >
                <ModalPrimitive
                    className={cn(
                        'max-h-full flex flex-col w-full rounded-t-3xl sm:rounded-lg overflow-hidden bg-background text-foreground text-left align-middle shadow-lg',
                        'ring-1 ring-zinc-950/5 dark:ring-white/15'
                    )}
                    initial={{ y: h }}
                    animate={{ y: 0 }}
                    exit={{ y: h }}
                    transition={staticTransition}
                    style={{
                        y,
                        top: 'auto',
                        height:
                            contentHeight > 0
                                ? `${contentHeight + drawerMargin}px`
                                : 'auto',
                        maxHeight: `calc(100% - ${drawerMargin}px)`
                    }}
                    drag='y'
                    dragConstraints={{ top: 0, bottom: h }}
                    onDragEnd={onDragEnd}
                    {...props}
                >
                    <div className='overflow-hidden'>
                        {withNotch && (
                            <div className='notch touch-pan-y sticky top-0 mx-auto shrink-0 mt-2.5 h-1.5 w-10 rounded-full bg-fg/20' />
                        )}
                        <div
                            className='overflow-y-auto mt-3'
                            ref={(el) => {
                                if (el) {
                                    const resizeObserver = new ResizeObserver(
                                        (entries) => {
                                            for (const entry of entries) {
                                                setContentHeight(entry.contentRect.height)
                                            }
                                        }
                                    )
                                    resizeObserver.observe(el)
                                    return () => resizeObserver.disconnect()
                                }
                            }}
                        >
                            <>{children}</>
                        </div>
                    </div>
                </ModalPrimitive>
            </ModalOverlayPrimitive>
        </>
    )
}

interface DrawerPrimitiveProps
    extends Omit<React.ComponentProps<typeof Modal>, 'children'> {
    'aria-label'?: DialogProps['aria-label']
    'aria-labelledby'?: DialogProps['aria-labelledby']
    role?: DialogProps['role']
    children?: DialogProps['children']
}

const DrawerPrimitive = (props: DrawerPrimitiveProps) => {
    const { isOpen } = useDrawerContext()

    const h = window.innerHeight - drawerMargin
    const y = useMotionValue(h)
    const bodyBorderRadius = useTransform(y, [0, h], [drawerRadius, 0])
    return (
        <motion.div
            style={{
                borderRadius: bodyBorderRadius,
                transformOrigin: 'center 0'
            }}
        >
            <AnimatePresence>{isOpen && <>{props.children}</>}</AnimatePresence>
        </motion.div>
    )
}

const DrawerTrigger = (props: ButtonProps) => {
    const { openDrawer } = useDrawerContext()

    return <Dialog.Trigger onPress={openDrawer} {...props} />
}

interface DrawerProps {
    children: React.ReactNode
    isOpen?: boolean
    withNotch?: boolean
    onOpenChange?: (isOpen: boolean) => void
}

const Drawer = ({
    children,
    withNotch = true,
    isOpen: controlledIsOpen,
    onOpenChange
}: DrawerProps) => {
    const [internalIsOpen, setInternalIsOpen] = React.useState(false)

    const isControlled = controlledIsOpen !== undefined
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen

    const openDrawer = () => {
        if (isControlled && onOpenChange) {
            onOpenChange(true)
        } else {
            setInternalIsOpen(true)
        }
    }

    const closeDrawer = () => {
        if (isControlled && onOpenChange) {
            onOpenChange(false)
        } else {
            setInternalIsOpen(false)
        }
    }

    if (typeof window === 'undefined') {
        return null
    }

    return (
        <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, withNotch }}>
            {children}
        </DrawerContext.Provider>
    )
}

const Content = ({
    children,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive>) => {
    return (
        <DrawerPrimitive>
            <DrawerContentPrimitive {...props}>
                <Dialog
                    role={props.role ?? 'dialog'}
                    aria-label={props['aria-label'] ?? undefined}
                    aria-labelledby={props['aria-labelledby'] ?? undefined}
                    className='sm:max-w-lg mx-auto'
                >
                    {(values) => (
                        <>
                            {typeof children === 'function' ? children(values) : children}
                        </>
                    )}
                </Dialog>
            </DrawerContentPrimitive>
        </DrawerPrimitive>
    )
}

const DrawerHeader = ({
    className,
    ...props
}: React.ComponentProps<typeof Dialog.Header>) => (
    <Dialog.Header className={cn('pt-2', className)} {...props} />
)

const DrawerBody = ({
    children,
    className,
    ...props
}: React.ComponentProps<typeof Dialog.Body>) => (
    <Dialog.Body {...props} className={cn('px-4', className)}>
        {children}
    </Dialog.Body>
)

const DrawerFooter = ({
    children,
    className,
    ...props
}: React.ComponentProps<typeof Dialog.Footer>) => (
    <Dialog.Footer {...props} className={cn('pb-2', className)}>
        {children}
    </Dialog.Footer>
)

Drawer.Body = DrawerBody
Drawer.Close = Dialog.Close
Drawer.Content = Content
Drawer.Description = Dialog.Description
Drawer.Footer = DrawerFooter
Drawer.Header = DrawerHeader
Drawer.Title = Dialog.Title
Drawer.Trigger = DrawerTrigger

export { Drawer }
