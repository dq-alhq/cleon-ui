'use client'

import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'

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
import {
    Button,
    type ButtonProps,
    Dialog as DialogPrimitive,
    type DialogProps,
    Heading,
    type HeadingProps,
    Modal,
    ModalOverlay
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Dialog } from './dialog'

const inertiaTransition: Inertia = {
    type: 'inertia',
    bounceStiffness: 300,
    bounceDamping: 40,
    timeConstant: 300
}
const staticTransition = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1]
}

const drawerMargin = 34
const drawerRadius = 32

interface DrawerContextType {
    isOpen: boolean
    openDrawer: () => void
    closeDrawer: () => void
    withNotch?: boolean
}

const DrawerContext = React.createContext<DrawerContextType | undefined>(undefined)

const useDrawerContext = () => {
    const context = useContext(DrawerContext)
    if (context === undefined) {
        throw new Error('useDrawerContext must be used within a Drawer')
    }
    return context
}

const ModalPrimitive = motion(Modal)
const ModalOverlayPrimitive = motion(ModalOverlay)

const DrawerOverlayPrimitive = (
    props: React.ComponentProps<typeof ModalOverlayPrimitive>
) => {
    const { closeDrawer, withNotch } = useDrawerContext()
    const [contentHeight, setContentHeight] = useState(0)
    const dialogRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (dialogRef.current) {
            setContentHeight(dialogRef.current.offsetHeight)
        }
    }, [])

    const h = Math.min(contentHeight + drawerMargin, window.innerHeight - drawerMargin)
    const y = useMotionValue(h)
    const bgOpacity = useTransform(y, [0, h], [0.4, 0])
    const bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`
    const root = document.getElementsByTagName('main')[0] as HTMLElement
    const bodyScale = useTransform(
        y,
        [0, h],
        [(window.innerWidth - drawerMargin) / window.innerWidth, 1]
    )
    const bodyTranslate = useTransform(y, [0, h], [drawerMargin - drawerRadius, 0])
    const bodyBorderRadius = useTransform(y, [0, h], [drawerRadius, 0])

    useMotionValueEvent(bodyScale, 'change', (v: any) => (root.style.scale = `${v}`))
    useMotionValueEvent(
        bodyTranslate,
        'change',
        (v: any) => (root.style.translate = `0 ${v}px`)
    )
    useMotionValueEvent(
        bodyBorderRadius,
        'change',
        (v) => (root.style.borderRadius = `${v}px`)
    )

    return (
        <>
            <ModalOverlayPrimitive
                isOpen
                onOpenChange={closeDrawer}
                className='fixed inset-0 z-50'
                style={{ backgroundColor: bg as any }}
            >
                <motion.section
                    aria-labelledby='overlay'
                    onTap={closeDrawer}
                    className='fixed inset-0 backdrop-blur-sm'
                    initial='collapsed'
                    animate='open'
                    exit='collapsed'
                    variants={{
                        open: { opacity: 1 },
                        collapsed: { opacity: 0 }
                    }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                ></motion.section>
                <ModalPrimitive
                    className={cn(
                        'absolute bottom-0 w-full rounded-t-2xl bg-background shadow-lg ring-1 ring-foreground/10',
                        props.className
                    )}
                    initial={{ y: h }}
                    animate={{ y: 0 }}
                    exit={{ y: h }}
                    transition={staticTransition}
                    style={{
                        y,
                        top: 'auto',
                        height: contentHeight + drawerMargin,
                        maxHeight: `calc(100% - ${drawerMargin}px)`
                    }}
                    drag='y'
                    dragConstraints={{ top: 0, bottom: h }}
                    onDragEnd={(_e, { offset, velocity }) => {
                        if (offset.y > h * 0.5 || velocity.y > 10) {
                            closeDrawer()
                        } else {
                            animate(y, 0, { ...inertiaTransition, min: 0, max: 0 })
                        }
                    }}
                    {...props}
                >
                    <div ref={dialogRef}>
                        {withNotch && (
                            <div className='notch mx-auto mt-2 h-1.5 w-10 rounded-full bg-foreground/20' />
                        )}
                        {props.children as React.ReactNode}
                    </div>
                </ModalPrimitive>
            </ModalOverlayPrimitive>
        </>
    )
}

interface DrawerContentPrimitiveProps
    extends Omit<React.ComponentProps<typeof Modal>, 'children'> {
    children?: DialogProps['children']
}

const DrawerContentPrimitive = (props: DrawerContentPrimitiveProps) => {
    const { isOpen } = useDrawerContext()

    const h = window.innerHeight - drawerMargin
    const y = useMotionValue(h)

    const bodyScale = useTransform(
        y,
        [0, h],
        [(window.innerWidth - drawerMargin) / window.innerWidth, 1]
    )
    const bodyTranslate = useTransform(y, [0, h], [drawerMargin - drawerRadius, 0])
    const bodyBorderRadius = useTransform(y, [0, h], [drawerRadius, 0])
    return (
        <motion.div
            style={{
                scale: bodyScale,
                borderRadius: bodyBorderRadius,
                y: bodyTranslate,
                transformOrigin: 'center 0'
            }}
        >
            <AnimatePresence>{isOpen && <>{props.children}</>}</AnimatePresence>
        </motion.div>
    )
}

const DrawerTrigger = (props: ButtonProps) => {
    const { openDrawer } = useDrawerContext()

    return <Button onPress={openDrawer} {...props} />
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
    const [internalIsOpen, setInternalIsOpen] = useState(false)

    const isControlled = controlledIsOpen !== undefined
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen

    useEffect(() => {
        if (isControlled && onOpenChange) {
            onOpenChange(isOpen)
        }
    }, [isOpen, isControlled, onOpenChange])

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

interface DrawerContentProps extends React.ComponentProps<typeof DrawerContentPrimitive> {
    children: React.ReactNode | ((values: any) => React.ReactNode)
}

const DrawerContent = ({ children, className, ...props }: DrawerContentProps) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState(0)

    useEffect(() => {
        if (!contentRef.current) return

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const cr = entry.contentRect
                setContentHeight(cr.height)
            }
        })

        resizeObserver.observe(contentRef.current)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    const childrenToRender =
        typeof children === 'function'
            ? (children as (values: any) => React.ReactNode)(DialogPrimitive)
            : children

    return (
        <DrawerContentPrimitive>
            <DrawerOverlayPrimitive {...props}>
                <DialogPrimitive
                    className={cn(
                        'mx-auto flex max-w-3xl flex-col justify-between overflow-y-auto px-4 mt-4 outline-none',
                        className
                    )}
                    style={{
                        height: contentHeight > 0 ? `${contentHeight}px` : 'auto',
                        maxHeight: `calc(var(--visual-viewport-height) - 4.5rem)`
                    }}
                >
                    <div ref={contentRef}>{childrenToRender}</div>
                </DialogPrimitive>
            </DrawerOverlayPrimitive>
        </DrawerContentPrimitive>
    )
}

interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
    isSticky?: boolean
}

const DrawerHeader = ({ className, isSticky = false, ...props }: DrawerHeaderProps) => (
    <div
        className={cn(
            'flex flex-col gap-y-1 text-center sm:text-left bg-background z-50',
            isSticky && 'sticky top-0',
            className
        )}
        {...props}
    />
)

const DrawerTitle = ({ className, ...props }: HeadingProps) => (
    <Heading
        slot='title'
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
    />
)

const DrawerDescription = Dialog.Description

const DrawerBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn('flex-1 overflow-y-auto overflow-x-hidden py-4', className)}
        {...props}
    />
)

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex shrink-0 pb-1 flex-col-reverse gap-2 sm:flex-row sm:justify-between [&_button:first-child:nth-last-child(1)]:w-full',
            className
        )}
        {...props}
    />
)

const DrawerClose = (props: React.ComponentProps<typeof Dialog.Close>) => {
    return <Dialog.Close shape='circle' {...props} />
}

Drawer.Body = DrawerBody
Drawer.Close = DrawerClose
Drawer.Content = DrawerContent
Drawer.Description = DrawerDescription
Drawer.Footer = DrawerFooter
Drawer.Header = DrawerHeader
Drawer.Title = DrawerTitle
Drawer.Trigger = DrawerTrigger

export { Drawer }
