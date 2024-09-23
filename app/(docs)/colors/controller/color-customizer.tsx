'use client'

import React from 'react'

import { IconBrandTailwind, IconPalette } from 'cleon-icons'
import { type ColorFormat } from 'react-aria-components'

import { Button, gridStyles, Popover, Toggle, Tooltip } from '@/components/ui'
import { generateColorScale } from '@/lib/colors'
import _radixcolors from '@/lib/radix-colors.json'
import _tailwindcolors from '@/lib/tailwind-colors.json'

import { CustomColor } from './color-create-preset'
import { ColorShades } from './color-shades'
import SelectFormat from './select-format'

export default function ColorCustomizer() {
    const [selectedFormat, setSelectedFormat] = React.useState<ColorFormat>('hsl')
    const [tailwindVariable, setTailwindVariable] = React.useState(false)

    const tailwindColors = _tailwindcolors.map((item) => ({
        name: item.name,
        children: generateColorScale(item.color)
    }))
    const radixColors = _radixcolors.map((item) => ({
        name: item.name,
        children: generateColorScale(item.color)
    }))

    return (
        <>
            <div className='w-full rounded-b-lg bg-background/60 backdrop-blur-xl sticky top-12 lg:top-14 py-6 z-10'>
                <div className='container flex flex-row gap-3 justify-between items-center'>
                    <Popover>
                        <Button variant='outline'>
                            <IconPalette /> Presets
                        </Button>
                        <Popover.Content placement='right'>In Progress</Popover.Content>
                    </Popover>
                    <div className='flex items-center gap-3'>
                        <Tooltip>
                            <Toggle
                                size='icon'
                                isSelected={tailwindVariable}
                                onChange={() => setTailwindVariable(!tailwindVariable)}
                            >
                                {({ isSelected }) => (
                                    <IconBrandTailwind
                                        className={
                                            isSelected
                                                ? '!text-sky-500'
                                                : '!text-foreground'
                                        }
                                    />
                                )}
                            </Toggle>
                            <Tooltip.Content>
                                Enable Tailwind Color Variable
                            </Tooltip.Content>
                        </Tooltip>
                        <SelectFormat
                            selectedFormat={selectedFormat}
                            setSelectedFormat={setSelectedFormat}
                        />
                    </div>
                </div>
            </div>
            <div className='container w-full space-y-2'>
                <CustomColor {...{ selectedFormat, tailwindVariable }} />

                <h2 className='text-muted-foreground pt-2 font-semibold'>
                    Tailwind Colors
                </h2>
                <div
                    className={gridStyles({
                        columns: { initial: 1, sm: 2 },
                        gap: { initial: 2 }
                    })}
                >
                    {tailwindColors.map((color, i) => (
                        <ColorShades
                            key={i}
                            item={color as any}
                            selectedFormat={selectedFormat}
                            tailwindVariable={tailwindVariable}
                        />
                    ))}
                </div>

                <h2 className='text-muted-foreground pt-2 font-semibold'>Radix Colors</h2>
                <div
                    className={gridStyles({
                        columns: { initial: 1, sm: 2 },
                        gap: { initial: 2 }
                    })}
                >
                    {radixColors.map((color, i) => (
                        <ColorShades
                            key={i}
                            item={color as any}
                            selectedFormat={selectedFormat}
                            tailwindVariable={tailwindVariable}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
