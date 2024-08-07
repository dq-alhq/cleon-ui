'use client'

import * as React from 'react'

import {
    Button as ButtonPrimitive,
    ColorPicker as ColorPickerPrimitive,
    type ColorPickerProps as ColorPickerPrimitiveProps,
    type ColorSpace,
    DialogTrigger,
    getColorChannels,
    Group
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import tailwindColors from 'tailwindcss/colors'

import { Button } from './button'
import {
    ColorArea,
    ColorSlider,
    ColorSwatch,
    ColorSwatchPicker,
    ColorSwatchPickerItem,
    ColorThumb,
    defaultColor
} from './color'
import { ColorField } from './color-field'
import { Description, Label } from './field'
import { Popover } from './popover'
import { Select } from './select'

const colorPickerStyles = tv({
    slots: {
        base: 'flex w-full flex-col gap-1',
        triggerColorField: 'size-10 -mr-2.5 grid place-content-center focus:outline-none',
        triggerColorPicker: 'w-full max-w-sm justify-start',
        colorArea: 'w-full sm:w-[calc(18rem-1.30rem)]',
        colorSlider: 'mt-2 [&_.cstrk]:orientation-horizontal:h-3',
        colorSwatchPicker: 'flex flex-wrap gap-x-2 gap-y-2.5'
    }
})

const {
    base,
    triggerColorField,
    triggerColorPicker,
    colorArea,
    colorSlider,
    colorSwatchPicker
} = colorPickerStyles()

interface ColorPickerProps extends ColorPickerPrimitiveProps {
    space?: ColorSpace
    enableColorSwatch?: boolean
    enableColorFormatSelection?: boolean
    isHex?: boolean
    label?: string
    description?: string
    errorMessage?: string
    placeholder?: string
    colors?: string[]
    isDisabled?: boolean
    className?: string
    trigger?: 'color-picker' | 'color-field'
    enableColorField?: boolean
    closeButton?: boolean
}

const ColorPicker = ({
    closeButton = true,
    enableColorSwatch = false,
    enableColorFormatSelection = false,
    enableColorField = true,
    label,
    description,
    colors = [...Object.values(tailwindColors.zinc)],
    placeholder = 'Fill Color',
    isHex = true,
    isDisabled = false,
    className,
    trigger = 'color-picker',
    ...props
}: ColorPickerProps) => {
    const [space, setSpace] = React.useState<ColorSpace>('rgb')
    const [isHexFormat, setIsHexFormat] = React.useState(false)
    const value = props.value ?? props.defaultValue
    return (
        <Group className={base(className)}>
            {label && <Label>{label}</Label>}
            <ColorPickerPrimitive defaultValue={defaultColor} {...props}>
                <DialogTrigger>
                    {trigger === 'color-field' ? (
                        <ButtonPrimitive
                            aria-label='Color swatch'
                            className={triggerColorField()}
                        >
                            <ColorSwatch
                                color={value?.toString(space)}
                                className='size-6'
                            />
                        </ButtonPrimitive>
                    ) : trigger === 'color-picker' ? (
                        <Button
                            aria-label='Color picker'
                            isDisabled={isDisabled}
                            variant='outline'
                            className={triggerColorPicker()}
                        >
                            <ColorSwatch
                                color={value?.toString(space)}
                                className='-ml-1.5 size-6'
                            />
                            {value ? (
                                <span>{value.toString(space)}</span>
                            ) : (
                                <span>{placeholder}</span>
                            )}
                        </Button>
                    ) : null}
                    <Popover.Content
                        showArrow={false}
                        className='p-2 min-w-[--trigger-width]'
                        {...props}
                    >
                        <div>
                            <ColorArea
                                aria-describedby={`${label ? `${label} color area` : 'Color slider'}`}
                                className={colorArea()}
                                colorSpace='hsb'
                                xChannel='saturation'
                                yChannel='brightness'
                            >
                                <ColorThumb className='z-50' />
                            </ColorArea>
                            <ColorSlider
                                aria-describedby={`${label ? `${label} color slider` : 'Color slider'}`}
                                showOutput={false}
                                className={colorSlider()}
                                colorSpace='hsb'
                                channel='hue'
                            />
                        </div>

                        <div className='grid gap-2'>
                            {enableColorFormatSelection && (
                                <Select
                                    aria-label='Color Space'
                                    selectedKey={space}
                                    defaultSelectedKey={space}
                                    onSelectionChange={(s) => {
                                        setSpace(s as ColorSpace)
                                        setIsHexFormat(s === 'hex')
                                    }}
                                >
                                    {['rgb', 'hex', 'hsl', 'hsb'].map((s) => (
                                        <Select.Item key={s} id={s} textValue={s}>
                                            {s}
                                        </Select.Item>
                                    ))}
                                </Select>
                            )}

                            {enableColorFormatSelection ? (
                                <div className='flex gap-1 w-[inherit]'>
                                    {isHexFormat ? (
                                        <ColorField
                                            aria-label='Hex color'
                                            colorSpace={space}
                                        />
                                    ) : (
                                        getColorChannels(space).map((channel) => (
                                            <ColorField
                                                aria-describedby={label ?? 'Color field'}
                                                colorSpace={space}
                                                channel={channel}
                                                key={channel}
                                            />
                                        ))
                                    )}
                                </div>
                            ) : enableColorField ? (
                                <ColorField
                                    aria-label={`Color in ${space} format`}
                                    colorSpace={space}
                                />
                            ) : null}
                        </div>

                        {enableColorSwatch && colors && colors.length > 0 && (
                            <ColorSwatchPicker
                                aria-label='Color swatch picker'
                                layout='grid'
                                className={colorSwatchPicker()}
                            >
                                {colors.map((color) => (
                                    <ColorSwatchPickerItem key={color} color={color} />
                                ))}
                            </ColorSwatchPicker>
                        )}

                        {closeButton && (
                            <div className='sm:hidden py-2.5 mx-auto w-full max-w-[inherit]'>
                                <Popover.Close shape='circle' className='w-full'>
                                    Close
                                </Popover.Close>
                            </div>
                        )}
                    </Popover.Content>
                </DialogTrigger>
            </ColorPickerPrimitive>
            {description && <Description>{description}</Description>}
        </Group>
    )
}

export { ColorPicker, type ColorPickerProps }
