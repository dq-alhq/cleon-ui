'use client'

import {
    composeRenderProps,
    TextArea as TextAreaPrimitive,
    TextField as TextFieldPrimitive,
    type TextFieldProps as TextFieldPrimitiveProps,
    type ValidationResult
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

import { Description, FieldError, Label } from './field'

export const textareaStyles = tv({
    base: [
        'w-full min-w-0 rounded-lg border border-muted bg-background px-2.5 py-2 text-base shadow-sm outline-none transition duration-200 disabled:bg-muted disabled:opacity-50 sm:text-sm',
        'focus:ring-4 focus:ring-primary/20 focus:border-primary invalid:border-danger focus:invalid:border-danger focus:invalid:ring-4 focus:invalid:ring-danger/20'
    ]
})

interface TextareaProps extends TextFieldPrimitiveProps {
    autoSize?: boolean
    label?: string
    placeholder?: string
    description?: string
    errorMessage?: string | ((validation: ValidationResult) => string)
    className?: string
}

const Textarea = ({
    className,
    placeholder,
    label,
    description,
    errorMessage,
    ...props
}: TextareaProps) => {
    return (
        <TextFieldPrimitive
            {...props}
            className={cn('group flex flex-col gap-1', className)}
        >
            {label && <Label>{label}</Label>}
            <TextAreaPrimitive
                placeholder={placeholder}
                className={composeRenderProps(className, (className, renderProps) =>
                    textareaStyles({
                        ...renderProps,
                        className
                    })
                )}
            />
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
        </TextFieldPrimitive>
    )
}

export { Textarea, type TextareaProps }
