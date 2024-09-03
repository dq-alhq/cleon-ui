'use client'

import * as React from 'react'

import { IconLoader } from 'cleon-icons'
import {
    TextField as TextFieldPrimitive,
    type TextFieldProps as TextFieldPrimitiveProps,
    type ValidationResult
} from 'react-aria-components'

import { cn } from '@/lib/utils'

import {
    Description,
    FieldError,
    FieldGroup,
    fieldGroupPrefixStyles,
    Input,
    Label
} from './field'

interface TextFieldProps extends TextFieldPrimitiveProps {
    label?: string
    placeholder?: string
    description?: string
    errorMessage?: string | ((validation: ValidationResult) => string)
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    isLoading?: boolean
    indicatorPlace?: 'prefix' | 'suffix'
}

const TextField = ({
    label,
    description,
    errorMessage,
    placeholder,
    prefix,
    suffix,
    isLoading,
    indicatorPlace,
    ...props
}: TextFieldProps) => {
    return (
        <TextFieldPrimitive
            {...props}
            className={cn('group flex flex-col gap-1', props.className)}
        >
            {label && <Label>{label}</Label>}
            <FieldGroup
                data-loading={isLoading ? 'true' : undefined}
                className={fieldGroupPrefixStyles()}
            >
                {isLoading && indicatorPlace === 'prefix' ? (
                    <IconLoader className='animate-spin isPfx' />
                ) : prefix ? (
                    <span className='atrs isPfx x2e2'>{prefix}</span>
                ) : null}
                <Input className='px-2.5' placeholder={placeholder} />
                {isLoading && indicatorPlace === 'suffix' ? (
                    <IconLoader className='animate-spin isSfx' />
                ) : suffix ? (
                    <span className='atrs isSfx x2e2'>{suffix}</span>
                ) : null}
            </FieldGroup>
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
        </TextFieldPrimitive>
    )
}

export { TextField, type TextFieldProps }
