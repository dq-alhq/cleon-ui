'use client'

import { cn } from '@/lib/utils'
import { Command as CommandPrimitive, useCommandState } from 'cmdk'
import * as React from 'react'
import { forwardRef, useEffect } from 'react'
import { Badge } from './badge'
import { Command } from './command'
import { Description, Label } from './field'

export interface MultiSelectItem {
    value: string
    label: string
    disable?: boolean
}
interface GroupOption {
    [key: string]: MultiSelectItem[]
}

interface MultiSelectProps {
    label?: string
    description?: string
    errorMessage?: string
    value?: MultiSelectItem[]
    defaultItems?: MultiSelectItem[]
    items?: MultiSelectItem[]
    placeholder?: string
    loadingIndicator?: React.ReactNode
    emptyIndicator?: React.ReactNode
    delay?: number
    triggerSearchOnFocus?: boolean
    onSearch?: (value: string) => Promise<MultiSelectItem[]>
    onChange?: (items: MultiSelectItem[]) => void
    max?: number
    onMax?: (maxLimit: number) => void
    hidePlaceholderWhenSelected?: boolean
    disabled?: boolean
    groupBy?: string
    className?: string
    selectFirstItem?: boolean
    creatable?: boolean
    onBlur?: () => void
    onFocus?: () => void
    isInvalid?: boolean
}

export interface MultiSelectRef {
    selectedValue: MultiSelectItem[]
    input: HTMLInputElement
}

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

function transToGroupOption(items: MultiSelectItem[], groupBy?: string) {
    if (items.length === 0) {
        return {}
    }
    if (!groupBy) {
        return {
            '': items
        }
    }

    const groupOption: GroupOption = {}
    items.forEach((item: any) => {
        const key = (item[groupBy] as string) || ''
        if (!groupOption[key]) {
            groupOption[key] = []
        }
        groupOption[key].push(item)
    })
    return groupOption
}

function removePickedOption(groupOption: GroupOption, picked: MultiSelectItem[]) {
    const cloneOption = JSON.parse(JSON.stringify(groupOption)) as GroupOption

    for (const [key, value] of Object.entries(cloneOption)) {
        cloneOption[key] = value.filter(
            (val) => !picked.find((p) => p.value === val.value)
        )
    }
    return cloneOption
}

function isOptionsExist(groupOption: GroupOption, targetOption: MultiSelectItem[]) {
    for (const [key, value] of Object.entries(groupOption)) {
        if (value.some((item) => targetOption.find((p) => p.value === item.value))) {
            return true
        }
    }
    return false
}

/**
 * The `CommandEmpty` of shadcn/ui will cause the cmdk empty not rendering correctly.
 * So we create one and copy the `Empty` implementation from `cmdk`.
 *
 * @reference: https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 **/
const CommandEmpty = forwardRef<
    HTMLDivElement,
    React.ComponentProps<typeof CommandPrimitive.Empty>
>(({ className, ...props }, forwardedRef) => {
    const render = useCommandState((state) => state.filtered.count === 0)

    if (!render) return null

    return (
        <div
            ref={forwardedRef}
            className={cn('py-6 text-center text-sm', className)}
            cmdk-empty=''
            role='presentation'
            {...props}
        />
    )
})

CommandEmpty.displayName = 'CommandEmpty'

const MultiSelect = React.forwardRef<MultiSelectRef, MultiSelectProps>(
    (
        {
            label,
            description,
            errorMessage,
            value,
            onChange,
            placeholder = 'Select Items',
            defaultItems: arrayDefaultItems = [],
            items: arrayOptions,
            delay,
            onSearch,
            loadingIndicator,
            emptyIndicator = 'No Result Found',
            max = Number.MAX_SAFE_INTEGER,
            onMax,
            hidePlaceholderWhenSelected,
            disabled,
            groupBy,
            className,
            selectFirstItem = true,
            creatable = false,
            triggerSearchOnFocus = false,
            isInvalid,
            ...props
        }: MultiSelectProps,
        ref: React.Ref<MultiSelectRef>
    ) => {
        const inputRef = React.useRef<HTMLInputElement>(null)
        const [open, setOpen] = React.useState(false)
        const [isLoading, setIsLoading] = React.useState(false)

        const [selected, setSelected] = React.useState<MultiSelectItem[]>(value || [])
        const [items, setOptions] = React.useState<GroupOption>(
            transToGroupOption(arrayDefaultItems, groupBy)
        )
        const [inputValue, setInputValue] = React.useState('')
        const debouncedSearchTerm = useDebounce(inputValue, delay || 500)

        React.useImperativeHandle(
            ref,
            () => ({
                selectedValue: [...selected],
                input: inputRef.current as HTMLInputElement,
                focus: () => inputRef.current?.focus()
            }),
            [selected]
        )

        const handleUnselect = React.useCallback(
            (item: MultiSelectItem) => {
                const newOptions = selected.filter((s) => s.value !== item.value)
                setSelected(newOptions)
                onChange?.(newOptions)
            },
            [onChange, selected]
        )

        const handleKeyDown = React.useCallback(
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                const input = inputRef.current
                if (input) {
                    if (e.key === 'Delete' || e.key === 'Backspace') {
                        if (input.value === '' && selected.length > 0) {
                            handleUnselect(selected[selected.length - 1])
                        }
                    }
                    // This is not a default behavior of the <input /> field
                    if (e.key === 'Escape') {
                        input.blur()
                    }
                }
            },
            [handleUnselect, selected]
        )

        useEffect(() => {
            if (value) {
                setSelected(value)
            }
            if (selected.length >= max) {
                setOpen(false)
            }
        }, [value, selected, max])

        useEffect(() => {
            /** If `onSearch` is provided, do not trigger items updated. */
            if (!arrayOptions || onSearch) {
                return
            }
            const newOption = transToGroupOption(arrayOptions || [], groupBy)
            if (JSON.stringify(newOption) !== JSON.stringify(items)) {
                setOptions(newOption)
            }
        }, [arrayDefaultItems, arrayOptions, groupBy, onSearch, items])

        useEffect(() => {
            const doSearch = async () => {
                setIsLoading(true)
                const res = await onSearch?.(debouncedSearchTerm)
                setOptions(transToGroupOption(res || [], groupBy))
                setIsLoading(false)
            }

            const exec = async () => {
                if (!onSearch || !open) return

                if (triggerSearchOnFocus) {
                    await doSearch()
                }

                if (debouncedSearchTerm) {
                    await doSearch()
                }
            }

            void exec()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus])

        const CreatableItem = () => {
            if (!creatable) return undefined
            if (
                isOptionsExist(items, [{ value: inputValue, label: inputValue }]) ||
                selected.find((s) => s.value === inputValue)
            ) {
                return undefined
            }

            const Item = (
                <Command.Item
                    value={inputValue}
                    className='cursor-pointer'
                    onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    onSelect={(value: string) => {
                        if (selected.length >= max) {
                            onMax?.(selected.length)
                            return
                        }
                        setInputValue('')
                        const newOptions = [...selected, { value, label: value }]
                        setSelected(newOptions)
                        onChange?.(newOptions)
                    }}
                >
                    {`Create "${inputValue}"`}
                </Command.Item>
            )

            // For normal creatable
            if (!onSearch && inputValue.length > 0) {
                return Item
            }

            // For async search creatable. avoid showing creatable item before loading at first.
            if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
                return Item
            }

            return undefined
        }

        const EmptyItem = React.useCallback(() => {
            if (!emptyIndicator) return undefined

            // For async search that showing emptyIndicator
            if (onSearch && !creatable && Object.keys(items).length === 0) {
                return (
                    <Command.Item value='-' disabled>
                        {emptyIndicator}
                    </Command.Item>
                )
            }

            return <CommandEmpty>{emptyIndicator}</CommandEmpty>
        }, [creatable, emptyIndicator, onSearch, items])

        const selectables = React.useMemo<GroupOption>(
            () => removePickedOption(items, selected),
            [items, selected]
        )

        return (
            <div className={cn('group flex w-full flex-col gap-1', className)}>
                <Label onClick={() => inputRef.current?.focus()}>{label}</Label>
                <CommandPrimitive
                    onKeyDown={(e) => handleKeyDown(e)}
                    className='overflow-visible bg-transparent h-auto'
                >
                    <div
                        className={cn(
                            'rounded-md border border-input bg-background px-2 py-[0.55rem] text-sm transition duration-200 focus-within:border-primary focus-within:ring focus-within:ring-primary/20',
                            {
                                'border-danger focus-within:border-danger focus-within:ring-danger/20':
                                    isInvalid
                            },
                            className
                        )}
                        onClick={() => {
                            if (disabled) return
                            inputRef.current?.focus()
                        }}
                    >
                        <div className='flex flex-wrap gap-1'>
                            {selected.map((item, index) => {
                                return (
                                    <Badge
                                        key={index}
                                        className='inline-flex items-center rounded-sm px-1'
                                    >
                                        <span className='text-xs'>{item.label}</span>
                                        <button
                                            aria-label={`Remove ${item.label} option`}
                                            aria-roledescription='button to remove option'
                                            type='button'
                                            className='inline-grid size-4 place-content-center rounded-full border border-transparent focus:border-foreground focus:text-foreground focus:outline-none'
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleUnselect(item)
                                                }
                                            }}
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            onClick={() => handleUnselect(item)}
                                        >
                                            <span className='sr-only'>
                                                Remove {item.label} option
                                            </span>
                                            <svg
                                                className='size-3.5 hover:text-foreground'
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 24 24'
                                            >
                                                <g
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                >
                                                    <circle
                                                        cx={12}
                                                        cy={12}
                                                        r={10}
                                                    ></circle>
                                                    <path d='m15 9l-6 6m0-6l6 6'></path>
                                                </g>
                                            </svg>
                                        </button>
                                    </Badge>
                                )
                            })}
                            {/* Avoid having the "Search" Icon */}
                            <CommandPrimitive.Input
                                ref={inputRef}
                                value={inputValue}
                                disabled={disabled}
                                onValueChange={setInputValue}
                                onBlur={() => {
                                    setOpen(false)
                                    props.onBlur
                                }}
                                onFocus={(event) => {
                                    setOpen(true)
                                    triggerSearchOnFocus &&
                                        onSearch?.(debouncedSearchTerm)
                                    props.onFocus
                                }}
                                placeholder={
                                    (hidePlaceholderWhenSelected &&
                                        selected.length !== 0) ||
                                    selected.length >= max
                                        ? ''
                                        : placeholder
                                }
                                className='ml-0.5 flex-1 bg-transparent outline-none placeholder:text-muted-foreground'
                            />
                        </div>
                    </div>
                    <div className={cn('relative', open ? 'block' : 'hidden')}>
                        {open && (
                            <CommandPrimitive.List className='absolute z-10 p-1 mt-2 w-full overflow-y-auto max-h-60 rounded-md border bg-background text-foreground shadow-md outline-none'>
                                {isLoading ? (
                                    <>{loadingIndicator}</>
                                ) : (
                                    <>
                                        {EmptyItem()}
                                        {CreatableItem()}
                                        {!selectFirstItem && (
                                            <CommandPrimitive.Item
                                                value='-'
                                                className='hidden'
                                            />
                                        )}
                                        {Object.entries(selectables).map(
                                            ([key, dropdowns]) => (
                                                <CommandPrimitive.Group
                                                    key={key}
                                                    heading={key}
                                                    className='h-full overflow-auto'
                                                >
                                                    <>
                                                        {dropdowns.map((item) => {
                                                            return (
                                                                <CommandPrimitive.Item
                                                                    key={item.value}
                                                                    value={item.label}
                                                                    disabled={
                                                                        item.disable
                                                                    }
                                                                    onMouseDown={(e) => {
                                                                        e.preventDefault()
                                                                        e.stopPropagation()
                                                                    }}
                                                                    onSelect={() => {
                                                                        if (
                                                                            selected.length >=
                                                                            max
                                                                        ) {
                                                                            onMax?.(
                                                                                selected.length
                                                                            )
                                                                            return
                                                                        }
                                                                        setInputValue('')
                                                                        const newOptions =
                                                                            [
                                                                                ...selected,
                                                                                item
                                                                            ]
                                                                        setSelected(
                                                                            newOptions
                                                                        )
                                                                        onChange?.(
                                                                            newOptions
                                                                        )
                                                                    }}
                                                                    className={cn(
                                                                        'relative flex w-full cursor-pointer duration-200 justify-between rounded-md p-2 text-sm transition-colors data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground',
                                                                        item.disable &&
                                                                            'cursor-default text-muted-foreground'
                                                                    )}
                                                                >
                                                                    {item.label}
                                                                </CommandPrimitive.Item>
                                                            )
                                                        })}
                                                    </>
                                                </CommandPrimitive.Group>
                                            )
                                        )}
                                    </>
                                )}
                            </CommandPrimitive.List>
                        )}
                    </div>
                </CommandPrimitive>
                {description && <Description>{description}</Description>}
                <span className='text-sm text-danger'>{errorMessage}</span>
            </div>
        )
    }
)

MultiSelect.displayName = 'MultiSelect'
export { MultiSelect }
