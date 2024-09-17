'use client'

import React from 'react'

import {
    Button,
    composeRenderProps,
    TagGroup as TagGroupPrimitive,
    TagList as TagListPrimitive,
    Tag as TagPrimitive,
    type TagGroupProps as TagGroupPrimitiveProps,
    type TagListProps,
    type TagProps as TagPrimitiveProps
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

import { badgeShapes, badgeStyles, badgeVariants } from './badge'
import { Description, Label } from './field'

const variants = {
    primary: {
        base: [
            badgeVariants.primary,
            '[&_[slot=remove]:hover]:bg-primary [&_[slot=remove]:hover]:text-primary-foreground'
        ],
        selected: [
            'bg-primary hover:bg-primary ring-primary ring-inset text-primary-foreground hover:text-primary-foreground',
            '[&_[slot=remove]:hover]:bg-primary-foreground/80 [&_[slot=remove]:hover]:text-primary'
        ]
    },
    secondary: {
        base: [
            badgeVariants.secondary,
            '[&_[slot=remove]:hover]:bg-foreground [&_[slot=remove]:hover]:text-background'
        ],
        selected: [
            'bg-dark hover:bg-foreground ring-foreground/50 text-background hover:text-background ring-inset',
            '[&_[slot=remove]:hover]:bg-foreground [&_[slot=remove]:hover]:text-background'
        ]
    },
    success: {
        base: [
            badgeVariants.success,
            '[&_[slot=remove]:hover]:bg-success [&_[slot=remove]:hover]:text-success-foreground'
        ],
        selected: [
            'bg-success ring-success ring-inset hover:bg-success text-success-foreground hover:text-success-foreground',
            '[&_[slot=remove]:hover]:bg-success-foreground/80 [&_[slot=remove]:hover]:text-success'
        ]
    },
    info: {
        base: [
            badgeVariants.info,
            '[&_[slot=remove]:hover]:bg-info [&_[slot=remove]:hover]:text-background'
        ],
        selected: [
            'bg-info hover:bg-info text-info-foreground hover:text-info-foreground',
            '[&_[slot=remove]:hover]:bg-background/80 [&_[slot=remove]:hover]:text-info'
        ]
    },
    warning: {
        base: badgeVariants.warning,
        selected:
            'bg-warning hover:bg-warning text-warning-foreground hover:text-warning-foreground'
    },
    danger: {
        base: badgeVariants.danger,
        selected:
            'bg-danger hover:bg-danger text-danger-foreground hover:text-danger-foreground'
    },
    dark: {
        base: [
            'border bg-background text-foreground',
            '[&_[slot=remove]:hover]:bg-foreground [&_[slot=remove]:hover]:text-background'
        ],
        selected: [
            'bg-dark text-dark-foreground hover:text-dark-foreground hover:bg-dark ring-dark ring-inset',
            '[&_[slot=remove]:hover]:bg-foreground [&_[slot=remove]:hover]:text-background'
        ]
    }
}

type Variant = keyof typeof badgeVariants

type Shape = keyof typeof badgeShapes

type TagGroupContextValue = {
    variant: Variant
    shape: Shape
}

const TagGroupContext = React.createContext<TagGroupContextValue>({
    variant: 'primary',
    shape: 'square'
})

export interface TagGroupProps extends TagGroupPrimitiveProps {
    variant?: Variant
    shape?: 'square' | 'circle'
    errorMessage?: string
    label?: string
    description?: string
}

const TagGroup = ({ children, ...props }: TagGroupProps) => {
    return (
        <TagGroupPrimitive
            {...props}
            className={cn('flex flex-wrap flex-col gap-1', props.className)}
        >
            <TagGroupContext.Provider
                value={{
                    variant: props.variant || 'primary',
                    shape: props.shape || 'square'
                }}
            >
                {props.label && <Label>{props.label}</Label>}
                {children}
                {props.description && <Description>{props.description}</Description>}
            </TagGroupContext.Provider>
        </TagGroupPrimitive>
    )
}

const TagList = <T extends object>(props: TagListProps<T>) => {
    return (
        <TagListPrimitive
            {...props}
            className={cn('flex flex-wrap gap-2', props.className)}
        />
    )
}

const tagStyles = tv({
    base: [badgeStyles.base, 'cursor-pointer focus:outline-none'],
    variants: {
        isFocused: { true: 'ring-2' },
        isDisabled: { true: 'opacity-50 cursor-default' },
        allowsRemoving: { true: 'pr-1' }
    }
})

interface TagProps extends TagPrimitiveProps {
    variant?: Variant
    shape?: Shape
}

const Tag = ({ children, variant, shape, ...props }: TagProps) => {
    const textValue = typeof children === 'string' ? children : undefined
    const groupContext = React.useContext(TagGroupContext)

    return (
        <TagPrimitive
            textValue={textValue}
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) => {
                const finalVariant = variant || groupContext.variant
                const finalShape = shape || groupContext.shape

                return tagStyles({
                    ...renderProps,
                    className: cn([
                        variants[finalVariant].base,
                        renderProps.isSelected
                            ? variants[finalVariant].selected
                            : undefined,
                        badgeShapes[finalShape]
                    ])
                })
            })}
        >
            {({ allowsRemoving }) => {
                return (
                    <>
                        {children}
                        {allowsRemoving && (
                            <Button
                                slot='remove'
                                className={composeRenderProps(
                                    '',
                                    (className, renderProps) => {
                                        return cn(
                                            'rounded focus:outline-none size-3.5 grid place-content-center -mr-0.5 focus-visible:ring-1 focus-visible:ring-primary',
                                            className
                                        )
                                    }
                                )}
                            >
                                <span className='rotate-45 text-base/4 -mr-px'>+</span>
                            </Button>
                        )}
                    </>
                )
            }}
        </TagPrimitive>
    )
}

export { Tag, TagGroup, TagList }
