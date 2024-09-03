'use client'

import { IconChevronLeft, IconChevronRight } from 'cleon-icons'
import {
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarGridHeader as CalendarGridHeaderPrimitive,
    CalendarHeaderCell,
    Calendar as CalendarPrimitive,
    type CalendarProps as CalendarPrimitiveProps,
    composeRenderProps,
    type DateValue,
    Heading,
    RangeCalendar as RangeCalendarPrimitive,
    type RangeCalendarProps as RangeCalendarPrimitiveProps,
    Text,
    useLocale
} from 'react-aria-components'
import { twJoin } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Button } from './button'

const cellStyles = tv({
    base: 'flex size-9 cursor-default items-center justify-center rounded-md text-sm outline-none focus:outline-none',
    variants: {
        isSelected: {
            false: 'text-foreground hover:bg-primary/20',
            true: 'bg-primary text-primary-foreground invalid:bg-danger invalid:text-danger-foreground'
        },
        isDisabled: {
            true: 'text-muted-foreground'
        }
    }
})

interface CalendarProps<T extends DateValue>
    extends Omit<CalendarPrimitiveProps<T>, 'visibleDuration'> {
    errorMessage?: string
    className?: string
}

const Calendar = <T extends DateValue>({
    errorMessage,
    className,
    ...props
}: CalendarProps<T>) => {
    return (
        <CalendarPrimitive {...props}>
            <CalendarHeader />
            <CalendarGrid className='[&_td]:px-0'>
                <CalendarGridHeader />
                <CalendarGridBody>
                    {(date) => (
                        <CalendarCell
                            date={date}
                            className={composeRenderProps(
                                className,
                                (className, renderProps) =>
                                    cellStyles({
                                        ...renderProps,
                                        className
                                    })
                            )}
                        />
                    )}
                </CalendarGridBody>
            </CalendarGrid>
            {errorMessage && (
                <Text slot='errorMessage' className='text-sm text-danger'>
                    {errorMessage}
                </Text>
            )}
        </CalendarPrimitive>
    )
}

const CalendarHeader = () => {
    const { direction } = useLocale()

    return (
        <header className='flex w-full justify-center items-center gap-1 px-1 pb-4'>
            <Button
                size='icon'
                className='[&_[data-slot=icon]]:text-foreground'
                variant='outline'
                slot='previous'
            >
                {direction === 'rtl' ? (
                    <IconChevronRight />
                ) : (
                    <IconChevronLeft aria-hidden />
                )}
            </Button>
            <Heading className='mx-2 flex-1 text-center text-base font-medium text-foreground' />
            <Button
                size='icon'
                className='[&_[data-slot=icon]]:text-foreground'
                variant='outline'
                slot='next'
            >
                {direction === 'rtl' ? <IconChevronLeft /> : <IconChevronRight />}
            </Button>
        </header>
    )
}

const CalendarGridHeader = () => {
    return (
        <CalendarGridHeaderPrimitive>
            {(day) => (
                <CalendarHeaderCell className='text-sm lg:text-xs font-semibold text-secondary'>
                    {day}
                </CalendarHeaderCell>
            )}
        </CalendarGridHeaderPrimitive>
    )
}

interface RangeCalendarProps<T extends DateValue>
    extends Omit<RangeCalendarPrimitiveProps<T>, 'visibleDuration'> {
    errorMessage?: string
}

const cellRangeStyles = tv({
    base: 'flex h-full w-full items-center justify-center rounded-md',
    variants: {
        selectionState: {
            none: 'group-hover:bg-primary/20 group-pressed:bg-primary group-pressed:text-primary-foreground',
            middle: [
                'group-hover:bg-primary/20',
                'group-invalid:group-hover:bg-danger',
                'group-pressed:bg-primary group-pressed:text-primary-foreground',
                'group-invalid:group-pressed:bg-danger group-invalid:group-pressed:text-danger-foreground'
            ],
            cap: 'bg-primary text-primary-foreground group-invalid:bg-danger group-invalid:text-danger-foreground'
        },
        isDisabled: {
            true: 'text-muted-foreground'
        }
    }
})

const RangeCalendar = <T extends DateValue>({
    errorMessage,
    ...props
}: RangeCalendarProps<T>) => {
    return (
        <RangeCalendarPrimitive {...props}>
            <CalendarHeader />
            <CalendarGrid className='[&_td]:px-0'>
                <CalendarGridHeader />
                <CalendarGridBody>
                    {(date) => (
                        <CalendarCell
                            date={date}
                            className={twJoin([
                                'group size-10 lg:size-9 cursor-default lg:text-sm outline outline-0 outside-month:text-zinc-300 selection-start:rounded-s-full selection-end:rounded-e-full forced-colors:selected:bg-[Highlight] forced-colors:invalid:selected:bg-[Mark]',
                                'selected:bg-primary/10 selected:text-primary forced-colors:selected:text-[HighlightText]',
                                '[td:first-child_&]:rounded-s-full [td:last-child_&]:rounded-e-full',
                                'invalid:selected:bg-danger/30'
                            ])}
                        >
                            {({
                                formattedDate,
                                isSelected,
                                isSelectionStart,
                                isSelectionEnd,
                                ...renderProps
                            }) => (
                                <span
                                    className={cellRangeStyles({
                                        ...renderProps,
                                        selectionState:
                                            isSelected &&
                                            (isSelectionStart || isSelectionEnd)
                                                ? 'cap'
                                                : isSelected
                                                  ? 'middle'
                                                  : 'none'
                                    })}
                                >
                                    {formattedDate}
                                </span>
                            )}
                        </CalendarCell>
                    )}
                </CalendarGridBody>
            </CalendarGrid>
            {errorMessage && (
                <Text slot='errorMessage' className='text-sm text-danger'>
                    {errorMessage}
                </Text>
            )}
        </RangeCalendarPrimitive>
    )
}

Calendar.GridHeader = CalendarGridHeader
Calendar.Header = CalendarHeader
Calendar.RangeCalendar = RangeCalendar

export { Calendar, type RangeCalendarProps }
