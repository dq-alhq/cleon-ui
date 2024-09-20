'use client'

import * as React from 'react'

import {
    composeRenderProps,
    FieldError as FieldErrorPrimitive,
    Group,
    Input as InputPrimitive,
    Label as LabelPrimitive,
    Text,
    type FieldErrorProps,
    type GroupProps,
    type InputProps,
    type LabelProps,
    type TextProps
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const fieldBorderStyles = tv({
    base: 'group-focus-within:border-primary forced-colors:border-[Highlight]',
    variants: {
        isInvalid: {
            true: 'border-danger/70 group-focus-within:border-danger/70 forced-colors:border-[Mark]'
        }
    }
})

const fieldGroupPrefixStyles = tv({
    base: [
        'flex group-invalid:border-danger group-disabled:bg-muted group-disabled:opacity-50 items-center group-invalid:focus-within:ring-danger/20',
        '[&>.atrs>.btn]:size-7 [&>.atrs>.btn]:rounded-sm [&>.atrs:has(.btn)]:size-9 [&>.atrs:has(.btn)]:grid [&>.atrs:has(.btn)]:place-items-center',
        '[&>.atrs>.btn]:before:rounded-[calc(theme(borderRadius.sm)-1px)] [&>.atrs>.btn]:after:rounded-[calc(theme(borderRadius.sm)-1px)] dark:[&>.atrs>.btn]:after:rounded-sm',
        '[&>.isSfx:has(.btn)]:-mr-2 [&>.isPfx:has(.btn)]:-ml-2 [&>.isSfx>.btn]:mr-0.5 [&>.isPfx>.btn]:ml-0.5'
    ]
})

const fieldStyles = tv({
    slots: {
        description: 'text-pretty text-base/6 text-muted-foreground sm:text-sm/6',
        label: 'w-fit cursor-default font-medium text-muted-foreground text-sm',
        fieldError: 'text-sm text-danger forced-colors:text-[Mark]',
        input: [
            'w-full min-w-0 bg-transparent p-2 text-base text-foreground placeholder-muted-foreground focus:outline-none lg:text-sm'
        ]
    }
})

const { description, label, fieldError, input } = fieldStyles()

const Label = ({ className, ...props }: LabelProps) => {
    return <LabelPrimitive {...props} className={label({ className })} />
}

const Description = ({ className, ...props }: TextProps) => {
    return <Text {...props} slot='description' className={description({ className })} />
}

const FieldError = ({ className, ...props }: FieldErrorProps) => {
    return <FieldErrorPrimitive {...props} className={cn(fieldError(), className)} />
}

const fieldGroupStyles = tv({
    base: [
        'group flex h-10 items-center overflow-hidden rounded-lg border border-muted bg-background transition disabled:opacity-50 disabled:bg-muted forced-colors:bg-[Field]',
        'focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/20',
        'focus-within:invalid:border-danger focus-within:invalid:ring-4 focus-within:invalid:ring-danger/20',
        'invalid:border-danger',
        'has-[.isPfx]:pl-2.5 has-[.isSfx]:pr-2.5 [&_[data-slot=icon]]:size-4 has-[.atrs]:shrink-0 has-[.atrs]:text-muted-foreground'
    ]
})

const FieldGroup = (props: GroupProps) => {
    return (
        <Group
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                fieldGroupStyles({ ...renderProps, className })
            )}
        />
    )
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <InputPrimitive ref={ref} {...props} className={cn(input(), props.className)} />
    )
})
Input.displayName = 'Input'

export {
    Description,
    fieldBorderStyles,
    FieldError,
    FieldGroup,
    fieldGroupPrefixStyles,
    fieldGroupStyles,
    Input,
    InputPrimitive,
    Label
}
