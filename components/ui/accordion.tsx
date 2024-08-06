'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion, type MotionProps } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'
import * as Primitive from 'react-aria-components'

interface AccordionContextType extends React.HtmlHTMLAttributes<HTMLDivElement> {
    hideBorder?: boolean
    hideIndicator?: boolean
    disabledKeys?: number[]
    defaultExpandedKeys?: number[] | string[]
}

const AccordionContext = React.createContext<AccordionContextType>({})
const useAccordion = () => React.useContext(AccordionContext)

interface AccordionProps extends AccordionContextType {
    children: React.ReactNode
}

const Accordion = ({
    children,
    disabledKeys,
    hideIndicator,
    hideBorder,
    defaultExpandedKeys,
    ...props
}: AccordionProps) => {
    return (
        <AccordionContext.Provider
            value={{ hideIndicator, defaultExpandedKeys, hideBorder, disabledKeys }}
        >
            <div {...props}>{children}</div>
        </AccordionContext.Provider>
    )
}

interface AccordionItemContextProps {
    setExpanded?: (index: null | number | string) => void
    isOpen?: boolean
    currentId: number | string
}

const AccordionItemContext = React.createContext<AccordionItemContextProps | undefined>(
    undefined
)
const useAccordionItem = () => {
    const context = React.useContext(AccordionItemContext)
    if (!context) {
        throw new Error('AccordionItem must be used within an Accordion')
    }
    return context
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    currentId: number | string
}

const AccordionItem = ({ className, children, currentId }: AccordionItemProps) => {
    const { defaultExpandedKeys, disabledKeys } = useAccordion()
    const [expanded, setExpanded] = React.useState<any>(
        // @ts-ignore - TS doesn't know that defaultExpandedKeys is an array of numbers
        defaultExpandedKeys?.includes(currentId) ? currentId : false
    )
    const isOpen = currentId === expanded
    const isLocked = disabledKeys?.includes(currentId as number)
    return (
        <AccordionItemContext.Provider value={{ setExpanded, isOpen, currentId }}>
            <div
                data-slot='item'
                data-locked={isLocked ?? undefined}
                data-open={isOpen ?? undefined}
                className={cn(
                    'flex group pb-3 relative w-full flex-col border-b accordion-item',
                    className
                )}
            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    )
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const AccordionContent = ({ className, children }: AccordionContentProps) => {
    const { isOpen } = useAccordionItem()
    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.section
                    className={cn('overflow-hidden pr-6 accordion-content', className)}
                    initial='collapsed'
                    animate='open'
                    exit='collapsed'
                    variants={{
                        open: { opacity: 1, height: 'initial' },
                        collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                    <div className='pb-0 pt-1'>{children}</div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

interface AccordionTriggerProps
    extends Omit<
        Primitive.ButtonProps & React.RefAttributes<HTMLButtonElement> & MotionProps,
        'ref'
    > {
    children: React.ReactNode
}

const AccordionTrigger = ({ className, children, ...props }: AccordionTriggerProps) => {
    const { setExpanded, isOpen, currentId } = useAccordionItem()
    const { hideIndicator, disabledKeys } = useAccordion()
    const isLocked = disabledKeys?.includes(currentId as number)

    const handlePress = () => {
        if (setExpanded) {
            setExpanded(isOpen ? null : currentId)
        }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            const buttons = document.querySelectorAll('div[data-slot="item"] > button')
            const currentButton = e.currentTarget
            const currentIndex = Array.from(buttons).indexOf(currentButton)
            const totalItems = buttons.length
            let nextIndex = currentIndex + (e.key === 'ArrowDown' ? 1 : -1)

            if (nextIndex >= totalItems) {
                nextIndex = 0
            } else if (nextIndex < 0) {
                nextIndex = totalItems - 1
            }

            ;(buttons[nextIndex] as HTMLElement).focus()
        }
    }

    return (
        <Primitive.Button
            {...props}
            isDisabled={isLocked}
            onKeyDown={onKeyDownHandler}
            onPress={handlePress}
            className={cn(
                'flex flex-1 rounded-lg text-foreground hover:text-primary [&_svg]:size-4 items-center gap-x-2 pt-3 font-medium',
                'focus:outline-none focus:text-primary',
                'disabled:opacity-70 disabled:pointer-events-none',
                isOpen && 'text-primary',
                className
            )}
        >
            {children}
            {!hideIndicator && (
                <ChevronDownIcon
                    className={cn(
                        'ml-auto transition duration-300 group-disabled:rotate-0',
                        isOpen ? 'rotate-180' : 'rotate-0'
                    )}
                />
            )}
        </Primitive.Button>
    )
}

Accordion.Trigger = AccordionTrigger
Accordion.Item = AccordionItem
Accordion.Content = AccordionContent

export { Accordion, type AccordionTriggerProps }
