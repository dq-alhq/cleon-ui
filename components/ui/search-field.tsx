'use client'

import { IconSearch, IconX } from 'cleon-icons'
import {
    SearchField as SearchFieldPrimitive,
    type SearchFieldProps as SearchFieldPrimitiveProps,
    type ValidationResult
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { Description, FieldError, FieldGroup, Input, Label } from './field'

const searchFieldStyles = tv({
    slots: {
        base: 'group flex min-w-10 flex-col gap-1',
        searchIcon:
            'ml-2 size-4 shrink-0 text-muted-foreground group-disabled:text-muted-foreground/50 forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]',
        closeButton:
            'mr-1 size-8 text-muted-foreground group-empty:invisible hover:bg-transparent pressed:text-foreground',
        input: '[&::-webkit-search-cancel-button]:hidden'
    }
})

const { base, searchIcon, closeButton, input } = searchFieldStyles()

interface SearchFieldProps extends SearchFieldPrimitiveProps {
    label?: string
    placeholder?: string
    description?: string
    errorMessage?: string | ((validation: ValidationResult) => string)
}

const SearchField = ({
    className,
    placeholder = 'Search',
    label,
    description,
    errorMessage,
    ...props
}: SearchFieldProps) => {
    return (
        <SearchFieldPrimitive {...props} className={cn(base(), className)}>
            {label && <Label>{label}</Label>}
            <FieldGroup>
                <IconSearch aria-hidden className={searchIcon()} />
                <Input placeholder={placeholder} className={input()} />
                <Button size='icon' variant='ghost' className={closeButton()}>
                    <IconX aria-hidden className='size-4' />
                </Button>
            </FieldGroup>
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
        </SearchFieldPrimitive>
    )
}

export { SearchField, type SearchFieldProps }
