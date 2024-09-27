'use client'

import React from 'react'

import { IconChevronDown, IconX } from 'cleon-icons'
import {
    Button as ButtonPrimitive,
    ComboBox as ComboboxPrimitive,
    ComboBoxStateContext,
    type ComboBoxProps as ComboboxPrimitiveProps,
    type ValidationResult
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { DropdownItem, DropdownSection } from './dropdown'
import { Description, FieldError, FieldGroup, Input, Label } from './field'
import { ListBox } from './list-box'
import { Popover } from './popover'

const comboboxStyles = tv({
    slots: {
        base: 'group w-full flex flex-col gap-1',
        chevronButton:
            'h-7 w-8 rounded outline-offset-0 text-muted-foreground active:bg-transparent hover:bg-transparent pressed:bg-transparent',
        chevronIcon:
            'text-muted-foreground transition duration-200 group-open:rotate-180 group-open:text-foreground',
        clearButton:
            'focus:outline-none absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground hover:text-foreground'
    }
})

const { base, chevronButton, chevronIcon, clearButton } = comboboxStyles()

interface ComboBoxProps<T extends object>
    extends Omit<ComboboxPrimitiveProps<T>, 'children'> {
    label?: string
    placeholder?: string
    description?: string | null
    errorMessage?: string | ((validation: ValidationResult) => string)
    children: React.ReactNode | ((item: T) => React.ReactNode)
}

const ComboBox = <T extends object>({
    label,
    description,
    errorMessage,
    children,
    placeholder,
    className,
    items,
    ...props
}: ComboBoxProps<T>) => {
    return (
        <ComboboxPrimitive
            menuTrigger='focus'
            {...props}
            className={cn(base(), className)}
        >
            <Label>{label}</Label>
            <FieldGroup className='pl-0 relative'>
                <Input className='pl-2.5' placeholder={placeholder} />
                <Button size='icon' variant='ghost' className={chevronButton()}>
                    {!props?.inputValue && (
                        <IconChevronDown aria-hidden className={chevronIcon()} />
                    )}
                </Button>
                {props?.inputValue && <ComboBoxClearButton />}
            </FieldGroup>
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
            <Popover.Picker>
                <ListBox.Picker items={items}>{children}</ListBox.Picker>
            </Popover.Picker>
        </ComboboxPrimitive>
    )
}

const ComboBoxClearButton = () => {
    const state = React.useContext(ComboBoxStateContext)

    return (
        <ButtonPrimitive
            className={clearButton()}
            slot={null}
            aria-label='Clear'
            onPress={() => {
                state?.setSelectedKey(null)
                state?.open()
            }}
        >
            <IconX className='size-4' />
        </ButtonPrimitive>
    )
}

const ComboBoxItem = DropdownItem
const ComboBoxSection = DropdownSection

ComboBox.Item = ComboBoxItem
ComboBox.Section = ComboBoxSection

export { ComboBox, type ComboBoxProps }
