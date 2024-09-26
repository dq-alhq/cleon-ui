'use client'

import React from 'react'

import { IconAdjustments, IconCheck, IconPalette, IconX } from 'cleon-icons'
import { useTheme } from 'next-themes'
import {
    ListBox,
    ListBoxItem,
    type ListBoxItemProps,
    type Selection
} from 'react-aria-components'

import ThemeSnippet from '@/components/theme-snippet'
import {
    Button,
    buttonVariants,
    ColorPicker,
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
import { applyTheme } from './controller'
import { FontsSans, type FontsSansName } from './fonts'
import { BrandColors, Presets, RadixColors, TailwindColors } from './theme-presets'
import { VariablesPreset, type VariablesPresetProps } from './variables-preset'

export default function ThemeCustomizer() {
    const [lightVars, setLightVars] = React.useState({
        '--background': Presets.cleon.light['--background'],
        '--foreground': Presets.cleon.light['--foreground'],
        '--primary': Presets.cleon.light['--primary'],
        '--primary-foreground': Presets.cleon.light['--primary-foreground'],
        '--secondary': Presets.cleon.light['--secondary'],
        '--secondary-foreground': Presets.cleon.light['--secondary-foreground'],
        '--danger': Presets.cleon.light['--danger'],
        '--danger-foreground': Presets.cleon.light['--danger-foreground'],
        '--success': Presets.cleon.light['--success'],
        '--success-foreground': Presets.cleon.light['--success-foreground'],
        '--warning': Presets.cleon.light['--warning'],
        '--warning-foreground': Presets.cleon.light['--warning-foreground'],
        '--info': Presets.cleon.light['--info'],
        '--info-foreground': Presets.cleon.light['--info-foreground'],
        '--dark': Presets.cleon.light['--dark'],
        '--dark-foreground': Presets.cleon.light['--dark-foreground'],
        '--muted': Presets.cleon.light['--muted'],
        '--muted-foreground': Presets.cleon.light['--muted-foreground']
    })
    const [darkVars, setDarkVars] = React.useState({
        '--background': Presets.cleon.dark['--background'],
        '--foreground': Presets.cleon.dark['--foreground'],
        '--primary': Presets.cleon.dark['--primary'],
        '--primary-foreground': Presets.cleon.dark['--primary-foreground'],
        '--secondary': Presets.cleon.dark['--secondary'],
        '--secondary-foreground': Presets.cleon.dark['--secondary-foreground'],
        '--danger': Presets.cleon.dark['--danger'],
        '--danger-foreground': Presets.cleon.dark['--danger-foreground'],
        '--success': Presets.cleon.dark['--success'],
        '--success-foreground': Presets.cleon.dark['--success-foreground'],
        '--warning': Presets.cleon.dark['--warning'],
        '--warning-foreground': Presets.cleon.dark['--warning-foreground'],
        '--info': Presets.cleon.dark['--info'],
        '--info-foreground': Presets.cleon.dark['--info-foreground'],
        '--dark': Presets.cleon.dark['--dark'],
        '--dark-foreground': Presets.cleon.dark['--dark-foreground'],
        '--muted': Presets.cleon.dark['--muted'],
        '--muted-foreground': Presets.cleon.dark['--muted-foreground']
    })
    const [radius, setRadius] = React.useState(Presets.cleon.radius)

    const [preset, setPreset] = React.useState<Selection>(new Set(['cleon']))

    const { resolvedTheme } = useTheme()
    const themeContainerRef = React.useRef<HTMLDivElement>(null)
    const [font, setFont] = React.useState<FontsSansName>('Geist')

    const handlePresetChange = (theme: string) => {
        setPreset(new Set([theme]))
        localStorage.setItem('theme-id', theme)
        setLightVars({ ...lightVars, ...Presets[theme].light })
        setDarkVars({ ...darkVars, ...Presets[theme].dark })
        setRadius(Presets[theme].radius ?? Presets.cleon.radius)

        const themeContainer = document.getElementsByTagName('html')[0]
        // const themeContainer = themeContainerRef.current
        if (themeContainer) applyTheme(themeContainer, theme, resolvedTheme as any)
    }

    React.useEffect(() => {
        const savedTheme =
            localStorage.getItem('theme-id') === 'undefined'
                ? 'cleon'
                : localStorage.getItem('theme-id')
        handlePresetChange(savedTheme ?? 'cleon')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolvedTheme])

    function getStyleCss() {
        return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --font-sans: "${font}", sans-serif;

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
                                    <Select
                                        label='Font'
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
                                            <Tabs.Label id='brands'>Brands</Tabs.Label>
                                        </Tabs.List>
                                        <Tabs.Content id='tailwind'>
                                            <ListBox
                                                aria-label='Tailwind Colors'
                                                className='grid grid-cols-2 gap-2 sm:grid-cols-3 mt-2'
                                                disallowEmptySelection
                                                selectionMode='single'
                                                selectedKeys={preset}
                                                onSelectionChange={(v) =>
                                                    // @ts-ignore
                                                    handlePresetChange(v.currentKey)
                                                }
                                                items={TailwindColors}
                                            >
                                                {(item) => (
                                                    <ColorPresetPicker
                                                        id={item.name}
                                                        key={item.name}
                                                        color={item.color}
                                                        textValue={item.label}
                                                    />
                                                )}
                                            </ListBox>
                                        </Tabs.Content>
                                        <Tabs.Content id='radix'>
                                            <ListBox
                                                aria-label='Radix Colors'
                                                className='grid grid-cols-2 gap-2 sm:grid-cols-3 mt-2'
                                                disallowEmptySelection
                                                selectionMode='single'
                                                selectedKeys={preset}
                                                onSelectionChange={(v) =>
                                                    // @ts-ignore
                                                    handlePresetChange(v.currentKey)
                                                }
                                                items={RadixColors}
                                            >
                                                {(item) => (
                                                    <ColorPresetPicker
                                                        id={item.name}
                                                        key={item.name}
                                                        color={item.color}
                                                        textValue={item.label}
                                                    />
                                                )}
                                            </ListBox>
                                        </Tabs.Content>
                                        <Tabs.Content id='brands'>
                                            <ListBox
                                                aria-label='Brand Colors'
                                                className='grid grid-cols-2 gap-2 sm:grid-cols-3 mt-2'
                                                disallowEmptySelection
                                                selectionMode='single'
                                                selectedKeys={preset}
                                                onSelectionChange={(v) =>
                                                    // @ts-ignore
                                                    handlePresetChange(v.currentKey)
                                                }
                                                items={BrandColors}
                                            >
                                                {(item) => (
                                                    <ColorPresetPicker
                                                        id={item.name}
                                                        key={item.name}
                                                        color={item.color}
                                                        textValue={item.label}
                                                    />
                                                )}
                                            </ListBox>
                                        </Tabs.Content>
                                    </Tabs>
                                </Popover.Body>
                            </Popover.Content>
                        </Popover>
                    </div>
                    <ThemeSnippet code={getStyleCss()} />
                </div>
            </div>
            <div
                className={cn(
                    'bg-background mb-6 border-secondary-foreground/10 text-foreground',
                    FontsSans[font].className
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
    color: string
}

const ColorPresetPicker = ({ color, textValue, ...props }: ColorPresetPickerProps) => {
    return (
        <ListBoxItem
            {...props}
            textValue={textValue}
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
                        style={{ backgroundColor: color }}
                        className={cn(
                            'mr-1 text-white flex size-4 shrink-0 border -translate-x-1 items-center justify-center rounded'
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
