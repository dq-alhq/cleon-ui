'use client'

import { useMediaQuery } from '@/lib/utils'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon, XIcon } from 'lucide-react'
import * as React from 'react'
import * as Primitive from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { Keyboard, type KeyboardProps } from './keyboard'
import { Separator } from './separator'

const commandStyles = tv({
    slots: {
        command: [
            'flex h-svh w-full flex-col overflow-hidden rounded-md bg-overlay text-overlay-foreground sm:h-full',
            '[&_[cmdk-group-heading]]:ml-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:-mb-1.5 [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_[data-slot=icon]]:size-5 [&_[cmdk-input]]:h-12',
            // for specific properties, it has to be controlled by the command
            '[&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:pl-2.5 [&_[cmdk-item]]:pr-4'
        ],
        list: 'overflow-y-auto lg:pb-0 max-h-[calc(100vh-35%)] pb-16 [&:not(:has(.command-section))]:p-2 [&:not(:has(.command-section))_.s3xsprt]:my-2 overflow-x-hidden md:max-h-[456px]',
        input: [
            'flex w-full rounded-md bg-transparent text-base placeholder:text-muted-foreground',
            'focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed'
        ],
        section: [
            'command-section overflow-hidden py-2 px-2 text-foreground',
            '[&_[cmdk-group-heading]]:select-none [&_[cmdk-group-heading]]:ml-[1px] [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[0.8rem] [&_[cmdk-group-heading]]:text-muted-foreground'
        ],
        modalOverlay: [
            'fixed inset-0 max-h-[--visual-viewport-height] z-50 bg-black/60 backdrop-blur-sm entering:animate-in entering:fade-in-0 exiting:animate-in exiting:fade-out-0'
        ],
        modal: [
            'fixed bottom-0 left-[50%] top-auto z-50 grid h-[calc(100vh-35%)] w-full max-w-full translate-x-[-50%] gap-4 overflow-hidden rounded-t-xl bg-background shadow-lg ring-1 ring-border sm:bottom-auto sm:top-[6rem] sm:h-auto sm:w-full sm:max-w-2xl sm:rounded-xl',
            'sm:entering:slide-in-from-bottom-auto entering:duration-300 entering:animate-in entering:fade-in-0 entering:slide-in-from-bottom-1/2 entering:slide-in-from-left-1/2 entering:[transition-timing-function:ease-out] sm:entering:duration-300 sm:entering:slide-in-from-top-[2rem]',
            'exiting:duration-300 exiting:animate-out exiting:fade-out-0 exiting:slide-out-to-bottom-1/2 exiting:slide-out-to-left-1/2 exiting:[transition-timing-function:ease] sm:exiting:slide-out-to-top-[4rem]'
        ],
        closeButton: [
            'absolute right-3 flex-shrink-0 top-1.5 [&_svg]:text-muted-foreground pressed:text-foreground [&_svg]:size-4 lg:top-3.5 rounded border lg:border-border border-transparent lg:bg-background py-2.5 px-2.5 lg:py-0.5 text-xs transition-opacity data-[state=open]:bg-background data-[state=open]:text-foreground lg:focus:border-foreground/70 lg:focus:outline-none lg:focus:ring-2 lg:focus:ring-ring disabled:pointer-events-none',
            'focus:outline-none lg:focus:ring-2 lg:focus:ring-primary/20 lg:focus:border-primary/70',
            'disabled:pointer-events-none'
        ],
        empty: 'py-6 text-center text-sm text-muted-foreground',
        kbdKeyboard: 'lg:block hidden group-data-[selected=true]:opacity-60',
        description:
            'sm:inline hidden text-sm group-data-[selected=true]:text-primary-foreground/70 text-muted-foreground ml-auto',
        item: [
            'group relative flex cursor-default select-none items-center rounded-lg py-2 text-sm outline-none',
            // selected
            'data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground [&[data-selected=true]_[data-slot=icon]]:text-primary-foreground',
            // danger
            'data-[danger=true]:text-danger data-[danger=true]:data-[selected=true]:bg-danger data-[danger=true]:data-[selected=true]:text-danger-foreground',
            // disabled
            'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
            // icon
            '[&_[data-slot=icon]]:mr-2 [&_[data-slot=icon]]:size-[1.10rem] [&_[data-slot=icon]]:shrink-0 [&_[data-slot=icon]]:text-muted-foreground',
            '[&_[data-slot=avatar]]:mr-2 [&_[data-slot=avatar]]:size-[1.10rem] [&_[data-slot=avatar]]:shrink-0'
        ]
    },

    variants: {
        isDanger: {
            true: 'text-danger data-[selected=true]:bg-danger data-[selected=true]:text-danger-foreground [&[data-selected=true]_[data-slot=icon]]:text-danger-foreground'
        }
    }
})

const {
    command,
    empty,
    section,
    list,
    item,
    closeButton,
    modal,
    input,
    modalOverlay,
    kbdKeyboard,
    description
} = commandStyles()

interface CommandContextProps {
    hideSearchIndicator?: boolean
    hideCloseButton?: boolean
    messageOnEmpty?: boolean | string
}

const CommandContext = React.createContext<CommandContextProps>({})

interface CommandProps extends Primitive.ModalOverlayProps, CommandContextProps {
    children: React.ReactNode
    value?: string
    messageOnEmpty?: boolean | string
    onValueChange?: (value: string) => void
}

const Command = ({
    hideSearchIndicator = false,
    hideCloseButton = false,
    messageOnEmpty,
    value,
    onValueChange,
    children,
    ...props
}: CommandProps) => {
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    return (
        <CommandContext.Provider
            value={{ hideSearchIndicator, hideCloseButton, messageOnEmpty }}
        >
            <Primitive.ModalOverlay isDismissable className={modalOverlay()} {...props}>
                <Primitive.Modal className={modal()}>
                    <Primitive.Dialog
                        className='outline-none'
                        aria-label='Command Palette'
                    >
                        {({ close }) => (
                            <>
                                <CommandPrimitive
                                    value={value}
                                    onValueChange={onValueChange}
                                    className={command()}
                                >
                                    {children}
                                </CommandPrimitive>
                                {!hideCloseButton && (
                                    <Primitive.Button
                                        autoFocus={!isDesktop}
                                        onPress={close}
                                        className={closeButton()}
                                    >
                                        <span className='lg:block hidden'>Esc</span>
                                        <span className='lg:hidden -mr-2 block'>
                                            <XIcon />
                                            <span className='sr-only'>
                                                Close command palette
                                            </span>
                                        </span>
                                    </Primitive.Button>
                                )}
                            </>
                        )}
                    </Primitive.Dialog>
                </Primitive.Modal>
            </Primitive.ModalOverlay>
        </CommandContext.Provider>
    )
}

interface CommandInputProps
    extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {}

const CommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    CommandInputProps
>(({ className, ...props }, ref) => {
    const { hideSearchIndicator } = React.useContext(CommandContext)
    return (
        <div className='flex border-b items-center px-3'>
            {!hideSearchIndicator && (
                <SearchIcon className='mr-2 size-5 shrink-0 opacity-50' />
            )}
            <CommandPrimitive.Input
                autoFocus
                ref={ref}
                className={input({ className: hideSearchIndicator ? 'pl-1' : className })}
                {...props}
            />
        </div>
    )
})

CommandInput.displayName = CommandPrimitive.Input.displayName

interface CommandListProps extends React.ComponentProps<typeof CommandPrimitive.List> {}

const CommandList = ({ className, ...props }: CommandListProps) => {
    const { messageOnEmpty } = React.useContext(CommandContext)
    return (
        <CommandPrimitive.List className={list({ className })} {...props}>
            {messageOnEmpty !== false && (
                <CommandEmpty>
                    {typeof messageOnEmpty === 'string'
                        ? messageOnEmpty
                        : 'No results found.'}
                </CommandEmpty>
            )}
            {props.children}
        </CommandPrimitive.List>
    )
}

interface CommandEmptyProps extends React.ComponentProps<typeof CommandPrimitive.Empty> {}

const CommandEmpty = ({ className, ...props }: CommandEmptyProps) => {
    return <CommandPrimitive.Empty className={empty({ className })} {...props} />
}

interface CommandSectionProps
    extends React.ComponentProps<typeof CommandPrimitive.Group> {
    separator?: boolean
}

const CommandSection = ({ className, separator, ...props }: CommandSectionProps) => {
    return (
        <>
            <CommandPrimitive.Group className={section({ className })} {...props}>
                {props.children}
                {separator && <CommandSeparator className='mt-2' />}
            </CommandPrimitive.Group>
        </>
    )
}

const CommandSeparator = ({ className, ...props }: Primitive.SeparatorProps) => {
    return (
        <div className='-mx-4 s3xsprt'>
            <Separator className={className} {...props} orientation='horizontal' />
        </div>
    )
}

interface CommandItemProps extends React.ComponentProps<typeof CommandPrimitive.Item> {
    isDanger?: boolean
}

const CommandItem = ({ isDanger, className, ...props }: CommandItemProps) => {
    return (
        <CommandPrimitive.Item
            data-danger={isDanger ? 'true' : undefined}
            className={item({ isDanger, className })}
            {...props}
        />
    )
}

const CommandDescription = ({ className, ...props }: Primitive.TextProps) => {
    return (
        <Primitive.Text
            {...props}
            slot='description'
            className={description({ className })}
        />
    )
}

const CommandKeyboard = (props: KeyboardProps) => (
    <Keyboard classNames={{ kbd: kbdKeyboard(), base: '-mr-2.5' }} {...props} />
)

Command.Description = CommandDescription
Command.Empty = CommandEmpty
Command.Input = CommandInput
Command.Item = CommandItem
Command.Keyboard = CommandKeyboard
Command.List = CommandList
Command.Section = CommandSection
Command.Separator = CommandSeparator

export { Command }
