'use client'

import * as React from 'react'

import { IconCalendarDays } from 'cleon-icons'
import {
    DatePicker as DatePickerPrimitive,
    type DatePickerProps as DatePickerPrimitiveProps,
    type DateValue,
    type DialogProps,
    type PopoverProps,
    type ValidationResult
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { Calendar } from './calendar'
import { DateInput } from './date-field'
import { Description, FieldError, FieldGroup, Label } from './field'
import { Popover } from './popover'

const datePickerStyles = tv({
    slots: {
        base: 'group flex flex-col gap-1',
        datePickerIcon:
            'group mr-1 h-7 dark:[&>[data-slot=icon]]:text-zinc-400 [&>[data-slot=icon]]:text-zinc-800 w-8 rounded outline-offset-0 hover:bg-transparent pressed:bg-transparent',
        calendarIcon: 'size-4 text-muted-foreground group-open:text-foreground',
        datePickerInput: 'w-full px-2 font-mono uppercase text-base lg:text-sm',
        dateRangePickerInputStart: 'px-2 lg:text-sm font-mono uppercase text-base',
        dateRangePickerInputEnd:
            'flex-1 px-2 py-1.5 font-mono uppercase text-base lg:text-sm',
        dateRangePickerDash:
            'text-zinc-800 group-disabled:text-zinc-200 dark:text-zinc-200 group-disabled:dark:text-zinc-600 forced-colors:text-[ButtonText] group-disabled:forced-colors:text-[GrayText]'
    }
})

const { base, datePickerIcon, calendarIcon, datePickerInput } = datePickerStyles()

interface DatePickerOverlayProps
    extends Omit<DialogProps, 'children' | 'className' | 'style'>,
        Omit<PopoverProps, 'children' | 'className' | 'style'> {
    className?: string | DialogProps['className'] | PopoverProps['className']
    children?: React.ReactNode
    closeButton?: boolean
    range?: boolean
}

const DatePickerOverlay = ({
    closeButton = true,
    range,
    ...props
}: DatePickerOverlayProps) => {
    return (
        <Popover.Content
            showArrow={false}
            className='flex justify-center min-w-[--trigger-width]'
            {...props}
        >
            {range ? <Calendar.RangeCalendar /> : <Calendar />}
            {closeButton && (
                <div className='sm:hidden py-2.5 mx-auto w-full max-w-[inherit]'>
                    <Popover.Close shape='circle' className='w-full'>
                        Close
                    </Popover.Close>
                </div>
            )}
        </Popover.Content>
    )
}

const DatePickerIcon = () => (
    <Button size='icon' variant='ghost' className={datePickerIcon()}>
        <IconCalendarDays aria-hidden className={calendarIcon()} />
    </Button>
)

interface DatePickerProps<T extends DateValue> extends DatePickerPrimitiveProps<T> {
    label?: string
    description?: string
    errorMessage?: string | ((validation: ValidationResult) => string)
}

const DatePicker = <T extends DateValue>({
    label,
    className,
    description,
    children,
    errorMessage,
    ...props
}: DatePickerProps<T>) => {
    return (
        <DatePickerPrimitive {...props} className={cn(base(), className)}>
            {label && <Label>{label}</Label>}
            <FieldGroup className='min-w-40'>
                <DateInput className={datePickerInput()} />
                <DatePickerIcon />
            </FieldGroup>
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
            <DatePickerOverlay />
        </DatePickerPrimitive>
    )
}

DatePicker.Icon = DatePickerIcon
DatePicker.Overlay = DatePickerOverlay

export { DatePicker, type DatePickerProps, type DateValue, type ValidationResult }
