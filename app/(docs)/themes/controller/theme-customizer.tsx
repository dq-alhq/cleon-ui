'use client'

import React from 'react'

import { IconAdjustments } from 'cleon-icons'
import { useTheme } from 'next-themes'

import {
    Button,
    buttonVariants,
    ColorPicker,
    NumberField,
    Popover,
    Select,
    Tabs
} from '@/components/ui'
import { formatColorForTailwind, formatColorFromTailwind } from '@/lib/utils'

import DataFormSink from '../../sink/data-form'
import UserProfileSink from '../../sink/user-profile'
import { baseColors, type BaseColorsProps } from './base-colors'
import {
    background,
    danger,
    foreground,
    info,
    primary,
    secondary,
    success,
    warning
} from './color-presets'
import ThemeSnippet from './theme-snippet'

export default function ThemeCustomizer() {
    const [lightVars, setLightVars] = React.useState({
        '--background': '0 0% 98.04%',
        '--foreground': '240 10% 3.92%',
        '--primary': '240 100% 33.33%',
        '--primary-foreground': '0 0% 98.04%',
        '--secondary': '240 5.2% 33.92%',
        '--secondary-foreground': '240 5.88% 90%',
        '--danger': '346.84 77.17% 49.8%',
        '--danger-foreground': '0 0% 98.04%',
        '--success': '120 100% 19.61%',
        '--success-foreground': '0 0% 98.04%',
        '--info': '280.13 60.63% 49.8%',
        '--info-foreground': '0 0% 98.04%',
        '--warning': '32.94 100% 50%',
        '--warning-foreground': '0 0% 98.04%',
        '--dark': '240 10% 4%',
        '--dark-foreground': '0 0% 98.04%',
        '--muted': '240 4.88% 83.92%',
        '--muted-foreground': '240 3.83% 46.08%'
    })
    const [darkVars, setDarkVars] = React.useState({
        '--background': '240 10% 3.92%',
        '--foreground': '0 0% 98.04%',
        '--primary': '240 67.06% 50%',
        '--primary-foreground': '0 0% 98.04%',
        '--secondary': '240 5.2% 33.92%',
        '--secondary-foreground': '0 0% 98.04%',
        '--danger': '348 83.33% 47.06%',
        '--danger-foreground': '0 0% 98.04%',
        '--success': '120 49.7% 32.75%',
        '--success-foreground': '0 0% 98.04%',
        '--info': '280.31 59.81% 58.04%',
        '--info-foreground': '0 0% 98.04%',
        '--warning': '32 95% 44%',
        '--warning-foreground': '0 0% 98.04%',
        '--dark': '0 0% 98.04%',
        '--dark-foreground': '240 10% 3.92%',
        '--muted': '240 5.2% 33.92%',
        '--muted-foreground': '240 3.83% 46.08%'
    })
    const [radius, setRadius] = React.useState(0.5)

    const [baseColor, setBaseColor] = React.useState<BaseColorsProps>('zinc')
    function setBaseColors(v: BaseColorsProps) {
        setBaseColor(v)
        setLightVars({
            ...lightVars,
            '--background': baseColors[baseColor].root['--background'],
            '--foreground': baseColors[baseColor].root['--foreground']
        })
        setDarkVars({
            ...darkVars,
            '--background': baseColors[baseColor].dark['--background'],
            '--foreground': baseColors[baseColor].dark['--foreground']
        })
    }

    const { resolvedTheme } = useTheme()
    const [themeId, setThemeId] = React.useState<BaseColorsProps>('zinc')
    const themeContainerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const applyTheme = (theme: BaseColorsProps) => {
            localStorage.setItem('theme-id', theme)
            setThemeId(theme)

            const themeContainer = themeContainerRef.current

            if (themeContainer) {
                const themeVariables = resolvedTheme === 'dark' ? darkVars : lightVars
                Object.keys(themeVariables).forEach((key) => {
                    themeContainer.style.setProperty(
                        key,
                        themeVariables[key as keyof typeof themeVariables]
                    )
                })
                themeContainer.style.setProperty('--radius', `${radius}rem`)
            }
        }

        localStorage.setItem('theme-id', baseColor)
        const savedTheme = localStorage.getItem('theme-id') as BaseColorsProps
        applyTheme(savedTheme)
    }, [themeId, resolvedTheme, lightVars, darkVars, baseColor, radius])

    function getStyleCss() {
        return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        ${Object.keys(lightVars)
            .map(
                (key) =>
                    `${key}: ${formatColorForTailwind(lightVars[key as keyof typeof lightVars])};`
            )
            .join('\n\t\t')}
        --radius: ${radius}rem;
    }
    .dark {
        ${Object.keys(darkVars)
            .map(
                (key) =>
                    `${key}: ${formatColorForTailwind(darkVars[key as keyof typeof darkVars])};`
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
            <div className='container rounded-b-lg bg-background/60 backdrop-blur-xl flex flex-col-reverse sm:flex-row gap-3 justify-between items-center sticky top-12 lg:top-14 py-6 z-10'>
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
                        </Popover.Header>
                        <Popover.Body className='mt-2 space-y-2'>
                            <Select
                                placement='right'
                                label='Base Color'
                                selectedKey={baseColor}
                                onSelectionChange={(v) =>
                                    setBaseColors(v as BaseColorsProps)
                                }
                                items={Object.keys(baseColors).map((key) => ({
                                    id: key,
                                    textValue: key
                                }))}
                            >
                                {(item) => (
                                    <Select.Item key={item.id}>
                                        {item.textValue}
                                    </Select.Item>
                                )}
                            </Select>
                            <Tabs>
                                <Tabs.List>
                                    <Tabs.Label id='light'>Light</Tabs.Label>
                                    <Tabs.Label id='dark'>Dark</Tabs.Label>
                                </Tabs.List>
                                <Tabs.Content id='light' className='grid grid-cols-2'>
                                    {Object.keys(lightVars).map((key, i) => (
                                        <ColorPick
                                            vars='light'
                                            label={key}
                                            key={i}
                                            value={formatColorFromTailwind(
                                                lightVars[key as keyof typeof lightVars]
                                            )}
                                            onChange={(v) =>
                                                setLightVars((prev) => ({
                                                    ...prev,
                                                    [key]: v
                                                }))
                                            }
                                        />
                                    ))}
                                </Tabs.Content>
                                <Tabs.Content id='dark' className='grid grid-cols-2'>
                                    {Object.keys(darkVars).map((key, i) => (
                                        <ColorPick
                                            vars='dark'
                                            label={key}
                                            key={i}
                                            value={formatColorFromTailwind(
                                                darkVars[key as keyof typeof darkVars]
                                            )}
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
                <ThemeSnippet code={getStyleCss()} />
            </div>
            <div
                className='bg-background mb-6 border-secondary-foreground/10 text-foreground'
                ref={themeContainerRef}
            >
                <div className='container w-full flex flex-col gap-6 items-center py-6'>
                    <div className='w-full flex gap-2 items-center justify-around flex-wrap p-4 rounded-lg border'>
                        {Object.keys(buttonVariants.variants.variant).map((variant) => (
                            <Button key={variant} variant={variant as any}>
                                {variant}
                            </Button>
                        ))}
                    </div>
                    <div className='flex flex-col lg:flex-row items-start gap-6 justify-between w-full'>
                        <div className='w-full'>
                            <DataFormSink />
                        </div>
                        <div className='w-full'>
                            <UserProfileSink />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface ColorPickProps {
    value: string
    onChange: (v: string) => void
    label: string
    vars: 'light' | 'dark'
}

const ColorPick = ({ value, onChange, label, vars, ...props }: ColorPickProps) => {
    let colorPreset
    switch (label) {
        case '--danger':
            colorPreset = Object.values(danger[vars])
            break
        case '--warning':
            colorPreset = Object.values(warning[vars])
            break
        case '--info':
            colorPreset = Object.values(info[vars])
            break
        case '--success':
            colorPreset = Object.values(success[vars])
            break
        case '--primary':
            colorPreset = Object.values(primary[vars])
            break
        case '--secondary':
        case '--muted':
            colorPreset = Object.values(secondary[vars])
            break
        case '--foreground':
        case '--dark':
            colorPreset = Object.values(foreground[vars])
            break
        default:
        case '--background':
            colorPreset = Object.values(background[vars])
    }

    return (
        <div className='flex justify-start items-center mx-0'>
            <ColorPicker
                enableColorSwatch
                colors={[...colorPreset]}
                {...props}
                className='mx-0 -ml-2 w-14 [&_.cs]:border'
                trigger='color-field'
                onChange={(v) => onChange(formatColorForTailwind(v.toString('hsl')))}
                value={value}
            />
            <span className='w-full text-xs'>{label}</span>
        </div>
    )
}
