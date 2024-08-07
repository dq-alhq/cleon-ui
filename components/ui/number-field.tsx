'use client'

import { ChevronDownIcon, ChevronUpIcon, MinusIcon, PlusIcon } from 'lucide-react'
import {
    Button,
    type ButtonProps,
    NumberField as NumberFieldPrimitive,
    type NumberFieldProps as NumberFieldPrimitiveProps,
    type ValidationResult
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cn, useMediaQuery } from '@/lib/utils'
import {
    Description,
    fieldBorderStyles,
    FieldError,
    FieldGroup,
    Input,
    Label
} from './field'

const numberFieldStyles = tv({
    slots: {
        base: 'group flex flex-col gap-1',
        stepperButton:
            'h-10 cursor-default px-2 text-muted-foreground pressed:bg-primary pressed:text-primary-foreground group-disabled:bg-secondary forced-colors:group-disabled:text-[GrayText]'
    }
})

const { base, stepperButton } = numberFieldStyles()

interface NumberFieldProps extends NumberFieldPrimitiveProps {
    label?: string
    description?: string
    placeholder?: string
    errorMessage?: string | ((validation: ValidationResult) => string)
}

const NumberField = ({
    label,
    placeholder,
    description,
    className,
    errorMessage,
    ...props
}: NumberFieldProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)')
    return (
        <NumberFieldPrimitive {...props} className={cn(base(), className)}>
            <Label>{label}</Label>
            <FieldGroup className='group-disabled:bg-secondary'>
                {(renderProps) => (
                    <>
                        {isMobile ? (
                            <StepperButton slot='decrement' className='border-r' />
                        ) : null}
                        <Input placeholder={placeholder} />
                        <div
                            className={fieldBorderStyles({
                                ...renderProps,
                                className: 'grid h-10 place-content-center border-s'
                            })}
                        >
                            {isMobile ? (
                                <StepperButton slot='increment' />
                            ) : (
                                <div className='flex h-full flex-col'>
                                    <StepperButton
                                        slot='increment'
                                        emblemType='chevron'
                                        className='h-5 px-1'
                                    />
                                    <div
                                        className={fieldBorderStyles({
                                            ...renderProps,
                                            className: 'border-b'
                                        })}
                                    />
                                    <StepperButton
                                        slot='decrement'
                                        emblemType='chevron'
                                        className='h-5 px-1'
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </FieldGroup>
            {description && <Description>{description}</Description>}
            <FieldError>{errorMessage}</FieldError>
        </NumberFieldPrimitive>
    )
}

interface StepperButtonProps extends ButtonProps {
    slot: 'increment' | 'decrement'
    emblemType?: 'chevron' | 'default'
    className?: string
}

const StepperButton = ({
    slot,
    className,
    emblemType = 'default',
    ...props
}: StepperButtonProps) => {
    const icon =
        emblemType === 'chevron' ? (
            slot === 'increment' ? (
                <ChevronUpIcon className='size-5' />
            ) : (
                <ChevronDownIcon className='size-5' />
            )
        ) : slot === 'increment' ? (
            <PlusIcon />
        ) : (
            <MinusIcon />
        )
    return (
        <Button className={stepperButton({ className })} slot={slot} {...props}>
            {icon}
        </Button>
    )
}

export { NumberField, type NumberFieldProps }
