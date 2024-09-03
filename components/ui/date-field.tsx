'use client'

import {
    composeRenderProps,
    DateField as DateFieldPrimitive,
    DateInput as DateInputPrimitive,
    DateSegment,
    type DateFieldProps as DateFieldPrimitiveProps,
    type DateInputProps,
    type DateValue,
    type ValidationResult
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

import { Description, FieldError, fieldGroupStyles, Label } from './field'

interface DateFieldProps<T extends DateValue> extends DateFieldPrimitiveProps<T> {
    label?: string
    description?: string
    errorMessage?: string | ((validation: ValidationResult) => string)
}

const DateField = <T extends DateValue>({
    label,
    description,
    errorMessage,
    ...props
}: DateFieldProps<T>) => {
    return (
        <DateFieldPrimitive
            {...props}
            className={cn('flex flex-col gap-1', props.className)}
        >
            {label && <Label>{label}</Label>}
            <DateInput />
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
        </DateFieldPrimitive>
    )
}

const segmentStyles = tv({
    base: 'inline shrink-0 rounded p-0.5 tracking-wider text-foreground caret-transparent outline outline-0 forced-color-adjust-none type-literal:px-0 lg:text-sm forced-colors:text-[ButtonText]',
    variants: {
        isPlaceholder: {
            true: 'text-muted-foreground'
        },
        isDisabled: {
            true: 'text-foreground/50 forced-colors:text-[GrayText]'
        },
        isFocused: {
            true: [
                'bg-primary text-primary-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
                'invalid:bg-danger invalid:text-danger-foreground'
            ]
        }
    }
})

const DateInput = (props: Omit<DateInputProps, 'children'>) => {
    return (
        <DateInputPrimitive
            className={composeRenderProps(props.className, (className, renderProps) =>
                fieldGroupStyles({
                    ...renderProps,
                    className: cn(
                        'min-w-sm block font-mono disabled:bg-secondary uppercase w-full py-2 px-2.5 text-base lg:text-sm/[1.4rem]',
                        className
                    )
                })
            )}
            {...props}
        >
            {(segment) => <DateSegment segment={segment} className={segmentStyles} />}
        </DateInputPrimitive>
    )
}

export { DateField, DateInput, segmentStyles, type DateFieldProps }
