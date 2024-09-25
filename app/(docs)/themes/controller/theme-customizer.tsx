'use client'

import React from 'react'

import { IconAdjustments, IconCheck, IconPalette, IconX } from 'cleon-icons'
import { useTheme } from 'next-themes'
import { ListBox, ListBoxItem, type ListBoxItemProps } from 'react-aria-components'

import ThemeSnippet from '@/components/theme-snippet'
import {
    Button,
    buttonVariants,
    ColorPicker,
    Label,
    NumberField,
    Popover,
    Select,
    Tabs
} from '@/components/ui'
import {
    formatColorForTailwind,
    formatColorFromTailwind,
    getColorName
} from '@/lib/colors'
import { cn, titleCase } from '@/lib/utils'

import ThemeContainer from '../theme-container'
import './color.css'
import { FontsMono, FontsSans, type FontsMonoName, type FontsSansName } from './fonts'
import {
    defaultColors,
    radixBaseColors,
    radixColors,
    tailwindBaseColors,
    tailwindColors,
    themedColors,
    type RadixBaseColors,
    type RadixColors,
    type TailwindBaseColors,
    type TailwindColors,
    type ThemedColors
} from './presets'
import { VariablesPreset, type VariablesPresetProps } from './variables-preset'

export default function ThemeCustomizer() {
    const [lightVars, setLightVars] = React.useState({
        '--background': '0 0% 98.04%',
        '--foreground': '240 10% 3.92%',
        '--primary': '224.3 76.3% 48%',
        '--primary-foreground': '0 0% 98.04%',
        '--secondary': '211.7 96.4% 78.4%',
        '--secondary-foreground': '226.2 57% 21%',
        '--danger': '0 72.22% 50.59%',
        '--danger-foreground': '0 0% 98.04%',
        '--success': '142.1 76.2% 36.3%',
        '--success-foreground': '0 0% 98.04%',
        '--warning': '24.6 95% 53.1%',
        '--warning-foreground': '0 0% 98.04%',
        '--info': '294.7 72.4% 39.8%',
        '--info-foreground': '0 0% 98.04%',
        '--dark': '240 10% 4%',
        '--dark-foreground': '0 0% 98.04%',
        '--muted': '240 4.88% 83.92%',
        '--muted-foreground': '240 3.83% 46.08%'
    })
    const [darkVars, setDarkVars] = React.useState({
        '--background': '240 10% 3.92%',
        '--foreground': '0 0% 98.04%',
        '--primary': '221.2 83.2% 53.3%',
        '--primary-foreground': '0 0% 98.04%',
        '--secondary': '226.2 57% 21%',
        '--secondary-foreground': '211.7 96.4% 78.4%',
        '--danger': '0 72.2% 50.6%',
        '--danger-foreground': '0 0% 98.04%',
        '--success': '142.1 76.2% 36.3%',
        '--success-foreground': '0 0% 98.04%',
        '--warning': '17.5 88.3% 40.4%',
        '--warning-foreground': '0 0% 98.04%',
        '--info': '294.7 72.4% 39.8%',
        '--info-foreground': '0 0% 98.04%',
        '--dark': '0 0% 98.04%',
        '--dark-foreground': '240 10% 3.92%',
        '--muted': '240 5.2% 33.92%',
        '--muted-foreground': '240 5.03% 64.9%'
    })
    const [radius, setRadius] = React.useState(0.5)

    const [baseColor, setBaseColor] = React.useState<
        TailwindBaseColors | RadixBaseColors
    >('zinc')
    const [accentColor, setAccentColor] = React.useState<
        TailwindColors | RadixColors | ThemedColors
    >('tw-blue')
    const [preset, setPreset] = React.useState<'tailwind' | 'radix' | 'themed'>(
        'tailwind'
    )

    function handleBaseColor(
        v: TailwindBaseColors | RadixBaseColors,
        preset: 'tailwind' | 'radix'
    ) {
        setBaseColor(v)
        setPreset(preset)
        if (preset === 'tailwind') {
            // @ts-ignore
            setLightVars({ ...lightVars, ...tailwindBaseColors[v.currentKey].light })
            // @ts-ignore
            setDarkVars({ ...darkVars, ...tailwindBaseColors[v.currentKey].dark })
        } else {
            // @ts-ignore
            setLightVars({ ...lightVars, ...radixBaseColors[v.currentKey].light })
            // @ts-ignore
            setDarkVars({ ...darkVars, ...radixBaseColors[v.currentKey].dark })
        }
    }
    function handleAccentColor(
        v: TailwindColors | RadixColors | ThemedColors,
        preset: 'tailwind' | 'radix' | 'themed'
    ) {
        setAccentColor(v)
        setPreset(preset)
        if (preset === 'tailwind') {
            // @ts-ignore
            setLightVars({ ...lightVars, ...tailwindColors[v.currentKey].light })
            // @ts-ignore
            setDarkVars({ ...darkVars, ...tailwindColors[v.currentKey].dark })
        } else if (preset === 'radix') {
            // @ts-ignore
            setLightVars({ ...lightVars, ...radixColors[v.currentKey].light })
            // @ts-ignore
            setDarkVars({ ...darkVars, ...radixColors[v.currentKey].dark })
        } else {
            // @ts-ignore
            setLightVars({ ...lightVars, ...themedColors[v.currentKey].light })
            // @ts-ignore
            setDarkVars({ ...darkVars, ...themedColors[v.currentKey].dark })
            // @ts-ignore
            setRadius(themedColors[v.currentKey].radius)
        }
    }

    function setDefault() {
        setLightVars(defaultColors.light)
        setDarkVars(defaultColors.dark)
        setRadius(defaultColors.radius)
    }

    const { resolvedTheme } = useTheme()
    const [themeId, setThemeId] = React.useState<'tailwind' | 'radix' | 'themed'>(
        'tailwind'
    )
    const themeContainerRef = React.useRef<HTMLDivElement>(null)

    const [font, setFont] = React.useState<FontsSansName>('Geist')

    const [fontMono, setFontMono] = React.useState<FontsMonoName>('Geist Mono')

    console.log(FontsSans[font])

    React.useEffect(() => {
        const applyTheme = (theme: 'tailwind' | 'radix' | 'themed') => {
            localStorage.setItem('theme-id', theme)
            setThemeId(theme)

            const themeContainer = document.getElementsByTagName('html')[0]
            // const themeContainer = themeContainerRef.current

            if (themeContainer) {
                const themeVariables = resolvedTheme === 'dark' ? darkVars : lightVars
                Object.keys(themeVariables).forEach((key) => {
                    themeContainer.style.setProperty(
                        key,
                        themeVariables[key as keyof typeof themeVariables]
                    )
                })
                themeContainer.style.setProperty('--radius', `${radius}rem`)
                themeContainer.style.setProperty(
                    '--font-sans',
                    `"${FontsSans[font]}", sans-serif`
                )
                themeContainer.style.setProperty(
                    '--font-mono',
                    `"${FontsMono[fontMono]}", monospace`
                )
            }
        }

        localStorage.setItem('theme-id', themeId)
        const savedTheme = localStorage.getItem('theme-id') as
            | 'tailwind'
            | 'radix'
            | 'themed'
        applyTheme(savedTheme)
    }, [themeId, resolvedTheme, lightVars, darkVars, baseColor, radius, font, fontMono])

    function getStyleCss() {
        return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --font-sans: "${font}", sans-serif;
        --font-mono: "${fontMono}", monospace;
        ${Object.keys(lightVars)
            .map(
                (key) =>
                    `${key}: ${lightVars[key as keyof typeof lightVars]}; /* ${getColorName({ color: lightVars[key as keyof typeof lightVars], type: 'hsl' })} */`
            )
            .join('\n\t\t')}
        --radius: ${radius}rem;
    }
    .dark {
        ${Object.keys(darkVars)
            .map(
                (key) =>
                    `${key}: ${darkVars[key as keyof typeof darkVars]}; /* ${getColorName({ color: darkVars[key as keyof typeof darkVars], type: 'hsl' })} */`
            )
            .join('\n\t\t')}
    }
}

@layer base {
  html {
    @apply scroll-smooth;
  }

  * {
    @apply border-muted;
    font-feature-settings: 'cv11', 'ss01';
    font-variation-settings: 'opsz' 850;
    text-rendering: optimizeLegibility;
    scrollbar-width: thin;
  }

  body {
    @apply bg-background text-foreground;
  }

  /* dark mode */
  .dark {
    scrollbar-width: thin;

    @media (prefers-color-scheme: dark) {
      * {
        scrollbar-width: thin;
      }
    }
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 5px;
  }

  *::-webkit-scrollbar-thumb {
    @apply bg-muted;
    border-radius: 14px;
    border: 3px solid transparent;
  }
}`
    }

    return (
        <>
            <div className='w-full rounded-b-lg bg-background/60 backdrop-blur-xl sticky top-12 lg:top-14 py-6 z-10'>
                <div className='container flex flex-row gap-3 justify-between items-center'>
                    <div className='flex flex-row gap-3'>
                        <Popover>
                            <Button variant='outline'>
                                <IconAdjustments />
                                Customize
                            </Button>
                            <Popover.Content placement='right'>
                                <Popover.Header>
                                    <Popover.Title>Style</Popover.Title>
                                    <Popover.Description>
                                        Customize your theme
                                    </Popover.Description>
                                    <Popover.Close
                                        variant='ghost'
                                        size='icon'
                                        className='absolute right-4 top-2 sm:hidden'
                                    >
                                        <IconX />
                                    </Popover.Close>
                                </Popover.Header>
                                <Popover.Body className='mt-2 space-y-2'>
                                    <div className='grid grid-cols-2 gap-2 w-full'>
                                        <Select
                                            label='Font Sans'
                                            selectedKey={font}
                                            onSelectionChange={(v) => setFont(v as any)}
                                            items={Object.keys(FontsSans).map((key) => ({
                                                id: key,
                                                textValue: titleCase(key)
                                            }))}
                                        >
                                            {(item) => (
                                                <Select.Item
                                                    key={item.id}
                                                    textValue={item.textValue}
                                                >
                                                    {item.textValue}
                                                </Select.Item>
                                            )}
                                        </Select>
                                        <Select
                                            label='Font Mono'
                                            selectedKey={fontMono}
                                            onSelectionChange={(v) =>
                                                setFontMono(v as any)
                                            }
                                            items={Object.keys(FontsMono).map((key) => ({
                                                id: key,
                                                textValue: titleCase(key)
                                            }))}
                                        >
                                            {(item) => (
                                                <Select.Item
                                                    key={item.id}
                                                    textValue={item.textValue}
                                                >
                                                    {item.textValue}
                                                </Select.Item>
                                            )}
                                        </Select>
                                    </div>
                                    <Tabs>
                                        <Tabs.List>
                                            <Tabs.Label id='light'>Light</Tabs.Label>
                                            <Tabs.Label id='dark'>Dark</Tabs.Label>
                                        </Tabs.List>
                                        <Tabs.Content
                                            id='light'
                                            className='grid grid-cols-2'
                                        >
                                            {Object.keys(lightVars).map((key, i) => (
                                                <ColorPick
                                                    theme='light'
                                                    label={key}
                                                    key={i}
                                                    variable={
                                                        formatColorFromTailwind(
                                                            lightVars[
                                                                key as keyof typeof lightVars
                                                            ]
                                                        ) as VariablesPresetProps['variable']
                                                    }
                                                    onChange={(v) =>
                                                        setLightVars((prev) => ({
                                                            ...prev,
                                                            [key]: v
                                                        }))
                                                    }
                                                />
                                            ))}
                                        </Tabs.Content>
                                        <Tabs.Content
                                            id='dark'
                                            className='grid grid-cols-2'
                                        >
                                            {Object.keys(darkVars).map((key, i) => (
                                                <ColorPick
                                                    theme='dark'
                                                    label={key}
                                                    key={i}
                                                    variable={
                                                        formatColorFromTailwind(
                                                            darkVars[
                                                                key as keyof typeof darkVars
                                                            ]
                                                        ) as VariablesPresetProps['variable']
                                                    }
                                                    onChange={(v) =>
                                                        setDarkVars((prev) => ({
                                                            ...prev,
                                                            [key]: v
                                                        }))
                                                    }
                                                />
                                            ))}
                                        </Tabs.Content>
                                    </Tabs>
                                    <NumberField
                                        step={0.05}
                                        minValue={0}
                                        maxValue={1}
                                        label='Border Radius'
                                        value={radius}
                                        onChange={setRadius}
                                    />
                                </Popover.Body>
                            </Popover.Content>
                        </Popover>
                        <Popover>
                            <Button variant='outline'>
                                <IconPalette />
                                Presets
                            </Button>
                            <Popover.Content placement='right'>
                                <Popover.Header>
                                    <Popover.Title>Presets</Popover.Title>
                                    <Popover.Description>
                                        Select a preset
                                    </Popover.Description>
                                    <Popover.Close
                                        variant='ghost'
                                        size='icon'
                                        className='absolute right-4 top-2 sm:hidden'
                                    >
                                        <IconX />
                                    </Popover.Close>
                                </Popover.Header>
                                <Popover.Body className='mt-2 space-y-2'>
                                    <Tabs>
                                        <Tabs.List>
                                            <Tabs.Label id='tailwind'>
                                                Tailwind
                                            </Tabs.Label>
                                            <Tabs.Label id='radix'>Radix</Tabs.Label>
                                            <Tabs.Label id='themed'>Brands</Tabs.Label>
                                        </Tabs.List>
                                        <Tabs.Content id='tailwind'>
                                            <Label htmlFor='base_color'>Base Color</Label>
                                            <ListBox
                                                aria-labelledby='base_color'
                                                className='grid grid-cols-2 gap-2 sm:grid-cols-3 my-2'
                                                disallowEmptySelection
                                                selectionMode='single'
                                                selectedKeys={baseColor}
                                                onSelectionChange={(v) =>
                                                    handleBaseColor(
                                                        v as TailwindBaseColors,
                                                        'tailwind'
                                                    )
                                                }
                                                items={Object.keys(
                                                    tailwindBaseColors
                                                ).map((item) => ({
                                                    id: item,
                                                    textValue: item as TailwindBaseColors
                                                }))}
                                            >
                                                {(item) => (
                                                    <ColorPresetPicker
                                                        id={item.id}
                                                        key={item.id}
                                                        color={item.textValue}
                                                        textValue={titleCase(
                                                            item.textValue.replace(
                                                                'tw-',
                                                                ''
                                                            )
                                                        )}
                                                    />
                                                )}
                                            </ListBox>
                                            <Label htmlFor='accent_color'>
                                                Accent Color
                                            </Label>
                                            <ListBox
                                                aria-labelledby='accent_color'
                                                className='grid grid-cols-2 gap-2 sm:grid-cols-3 mt-2'
                                                disallowEmptySelection
                                                selectionMode='single'
                                                selectedKeys={accentColor}
                                                onSelectionChange={(v) =>
                                                    handleAccentColor(
                                                        v as TailwindColors,
                                                        'tailwind'
                                                    )
                                                }
                                                items={Object.keys(tailwindColors).map(
                                                    (item) => ({
                                                        id: item,
                                                        textValue: item as TailwindColors
                                                    })
                                                )}
                                            >
                                                {(item) => (
                                                    <ColorPresetPicker
                                                        id={item.id}
                                                        key={item.id}
                                                        color={item.textValue}
                                                        textValue={titleCase(
                                                            item.textValue.replace(
                                                                'tw-',
                                                                ''
                                                            )
                                                        )}
                                                    />
                                                )}
                                            </ListBox>
                                        </Tabs.Content>
                                        <Tabs.Content id='radix'>
                                            <Label htmlFor='base_color'>Base Color</Label>
                                            <ListBox
                                                aria-labelledby='base_color'
                                                className='grid grid-cols-2 gap-2 sm:grid-cols-3 my-2'
                                                disallowEmptySelection
                                                selectionMode='single'
                                                selectedKeys={baseColor}
                                                onSelectionChange={(v) =>
                                                    handleBaseColor(
                                                        v as RadixBaseColors,
                                                        'radix'
                                                    )
                                                }
                                                items={Object.keys(radixBaseColors).map(
                                                    (item) => ({
                                                        id: item,
                                                        textValue: item as RadixBaseColors
                                                    })
                                                )}
                                            >
                                                {(item) => (
                                                    <ColorPresetPicker
                                                        id={item.id}
                                                        key={item.id}
                                                        color={item.textValue}
                                                        textValue={titleCase(
                                                            item.textValue
                                                        )}
                                                    />
                                                )}
                                            </ListBox>
                                            <Label htmlFor='accent_color'>
                                                Accent Color
                                            </Label>
                                            <ListBox
                                                aria-labelledby='accent_color'
                                                className='grid grid-cols-2 gap-2 sm:grid-cols-3 mt-2'
                                                disallowEmptySelection
                                                selectionMode='single'
                                                selectedKeys={accentColor}
                                                onSelectionChange={(v) =>
                                                    handleAccentColor(
                                                        v as RadixColors,
                                                        'radix'
                                                    )
                                                }
                                                items={Object.keys(radixColors).map(
                                                    (item) => ({
                                                        id: item,
                                                        textValue: item as RadixColors
                                                    })
                                                )}
                                            >
                                                {(item) => (
                                                    <ColorPresetPicker
                                                        id={item.id}
                                                        key={item.id}
                                                        color={item.textValue}
                                                        textValue={titleCase(
                                                            item.textValue
                                                        )}
                                                    />
                                                )}
                                            </ListBox>
                                        </Tabs.Content>
                                        <Tabs.Content id='themed'>
                                            <ListBox
                                                aria-label='themed_color'
                                                className='grid grid-cols-2 gap-2 sm:grid-cols-3 mt-2'
                                                disallowEmptySelection
                                                selectionMode='single'
                                                selectedKeys={accentColor}
                                                onSelectionChange={(v) =>
                                                    handleAccentColor(
                                                        v as ThemedColors,
                                                        'themed'
                                                    )
                                                }
                                                items={Object.keys(themedColors).map(
                                                    (item) => ({
                                                        id: item,
                                                        textValue: item as ThemedColors
                                                    })
                                                )}
                                            >
                                                {(item) => (
                                                    <ColorPresetPicker
                                                        id={item.id}
                                                        key={item.id}
                                                        color={item.textValue}
                                                        textValue={item.textValue.replace(
                                                            '-',
                                                            ' '
                                                        )}
                                                    />
                                                )}
                                            </ListBox>
                                        </Tabs.Content>
                                    </Tabs>
                                    <Button onPress={setDefault} variant='outline'>
                                        Default
                                    </Button>
                                </Popover.Body>
                            </Popover.Content>
                        </Popover>
                    </div>
                    <ThemeSnippet code={getStyleCss()} />
                </div>
            </div>
            <div
                className={cn(
                    'bg-background mb-6 border-secondary-foreground/10 font-sans text-foreground',
                    FontsSans[font]
                )}
                ref={themeContainerRef}
            >
                <ThemeContainer />
            </div>
        </>
    )
}

interface ColorPickProps extends VariablesPresetProps {
    label: string
    onChange: (v: string) => void
}

const ColorPick = ({ variable, onChange, label, theme, ...props }: ColorPickProps) => {
    const variblePreset = VariablesPreset({ variable, theme })

    return (
        <div className='flex justify-start items-center mx-0'>
            <ColorPicker
                enableColorSwatch
                enableColorFormatSelection
                colors={[...variblePreset]}
                {...props}
                className='mx-0 -ml-2 w-14 [&_.cs]:border'
                trigger='color-field'
                onChange={(v) => onChange(formatColorForTailwind(v.toString('hsl')))}
                value={variable}
            />
            <span className='w-full text-xs font-mono'>{label}</span>
        </div>
    )
}

interface ColorPresetPickerProps extends ListBoxItemProps {
    color:
        | TailwindBaseColors
        | RadixBaseColors
        | TailwindColors
        | RadixColors
        | ThemedColors
}

const ColorPresetPicker = ({ color, textValue, ...props }: ColorPresetPickerProps) => {
    return (
        <ListBoxItem
            {...props}
            className={cn(
                buttonVariants({
                    size: 'sm',
                    variant: 'outline',
                    className: 'justify-start text-xs cursor-pointer [&_svg]:size-3'
                })
            )}
        >
            {({ isSelected }) => (
                <>
                    <span
                        className={cn(
                            'mr-1 flex size-4 text-white shrink-0 border -translate-x-1 items-center justify-center rounded',
                            color
                        )}
                    >
                        {isSelected && <IconCheck />}
                    </span>
                    {textValue}
                </>
            )}
        </ListBoxItem>
    )
}
