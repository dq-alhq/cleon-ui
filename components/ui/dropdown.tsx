'use client'

import { CheckIcon } from 'lucide-react'
import {
    Collection,
    composeRenderProps,
    Header,
    ListBoxItem as ListBoxItemPrimitive,
    type ListBoxItemProps,
    Section,
    type SectionProps,
    Text,
    type TextProps
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

const dropdownItemStyles = tv({
    base: [
        'group flex cursor-default select-none items-center gap-x-1.5 rounded-md py-2 pl-2.5 pr-1 text-base outline outline-0 forced-color-adjust-none lg:text-sm',
        '[&_[data-slot=avatar]]:-mr-0.5 [&_[data-slot=avatar]]:size-6 sm:[&_[data-slot=avatar]]:size-5',
        '[&_[data-slot=icon]]:size-4 [&_svg]:size-4',
        'has-submenu:open:data-[danger=true]:bg-danger/20 has-submenu:open:data-[danger=true]:text-danger',
        'has-submenu:open:bg-primary has-submenu:open:text-primary-foreground'
    ],
    variants: {
        isDisabled: {
            false: 'text-foreground',
            true: 'text-muted-foreground forced-colors:text-[GrayText]'
        },
        isFocused: {
            false: 'data-[danger=true]:text-danger',
            true: [
                'bg-primary text-primary-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
                'data-[danger=true]:bg-danger data-[danger=true]:text-danger-foreground',
                '[&_.text-muted-foreground]:text-primary-foreground/80 [&[data-slot=label]]:text-primary-foreground [&[data-slot=description]]:text-primary-foreground'
            ]
        }
    },
    compoundVariants: [
        {
            isFocused: false,
            isOpen: true,
            className: 'bg-zinc-100 dark:bg-zinc-700/60'
        }
    ]
})

interface DropdownSectionProps<T> extends SectionProps<T> {
    title?: string
}

const dropdownSectionStyles = tv({
    slots: {
        base: "first:-mt-[5px] xss3 after:content-[''] after:block after:h-[5px]",
        header: 'text-sm font-medium text-muted-foreground bg-background px-4 py-2 truncate min-w-[--trigger-width] sticky -top-[5px] backdrop-blur -mt-px -mx-1 z-10 supports-[-moz-appearance:none]:bg-background border-y [&+*]:mt-1'
    }
})

const { base, header } = dropdownSectionStyles()

const DropdownSection = <T extends object>({
    className,
    ...props
}: DropdownSectionProps<T>) => {
    return (
        <Section className={base(className)}>
            {'title' in props && <Header className={header()}>{props.title}</Header>}
            <Collection items={props.items}>{props.children}</Collection>
        </Section>
    )
}

const DropdownItem = ({ className, ...props }: ListBoxItemProps) => {
    const textValue =
        props.textValue ||
        (typeof props.children === 'string' ? props.children : undefined)
    return (
        <ListBoxItemPrimitive
            textValue={textValue}
            className={composeRenderProps(className, (className, renderProps) =>
                dropdownItemStyles({ ...renderProps, className })
            )}
            {...props}
        >
            {composeRenderProps(props.children, (children, { isSelected }) => (
                <>
                    <span className='flex flex-1 items-center gap-2 truncate font-normal group-selected:font-medium'>
                        {children}
                    </span>
                    <span className='flex w-5 items-center'>
                        {isSelected && <CheckIcon className='h-4 w-4' />}
                    </span>
                </>
            ))}
        </ListBoxItemPrimitive>
    )
}

interface DropdownItemSlot extends TextProps {
    label?: TextProps['children']
    description?: TextProps['children']
}

const DropdownItemDetails = ({ label, description, ...props }: DropdownItemSlot) => {
    return (
        <div className='flex flex-col gap-1'>
            <Text slot='label' className='font-medium lg:text-sm' {...props}>
                {label}
            </Text>
            <Text slot='description' className='text-muted-foreground text-xs' {...props}>
                {description}
            </Text>
        </div>
    )
}

export {
    DropdownItem,
    DropdownItemDetails,
    dropdownItemStyles,
    DropdownSection,
    type DropdownSectionProps
}
